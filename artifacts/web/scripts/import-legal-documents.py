"""Import the supplied DOCX documents without rewriting their legal wording.

Run from the repository root after replacing the corresponding source documents.
Outputs structured content plus byte-identical downloadable originals.
"""
import json
import re
import shutil
import unicodedata
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[3]
WEB = ROOT / "artifacts/web"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{" + NS["w"] + "}"
SOURCES = {
    "terms": {
        "sk": ("Všeobecné_obchodné_podmienky_1792493358620.docx", "Obchodné podmienky", "Všeobecné obchodné podmienky služieb Freshkom. Objednávky, ceny, platby, odstúpenie a práva zákazníkov spoločnosti Comorno s. r. o."),
        "hu": ("Általános_szerződési_feltételek_1792493358622.docx", "Általános szerződési feltételek", "A Freshkom szolgáltatásainak általános szerződési feltételei: megrendelések, árak, fizetés és fogyasztói jogok. Szolgáltató: Comorno s. r. o."),
    },
    "privacy": {
        "sk": ("Zásady_ochrany_osobných_údajov_1792493358621.docx", "Zásady ochrany osobných údajov", "Ako Freshkom a Comorno s. r. o. spracúvajú osobné údaje: účely, právne základy, uchovávanie údajov, cookies a vaše práva."),
        "hu": ("Adatvédelmi_tájékoztató_1792493358623.docx", "Adatvédelmi tájékoztató", "A Freshkom és a Comorno s. r. o. adatvédelmi tájékoztatója: az adatkezelés céljai, jogalapja, megőrzési idők, sütik és az Ön jogai."),
    },
    "complaints": {
        "sk": ("Reklamačný_poriadok_1792493358622.docx", "Reklamačný poriadok", "Reklamačný poriadok služieb Freshkom: uplatnenie reklamácie, zodpovednosť za vady, postup vybavenia a vzorový reklamačný formulár."),
        "hu": ("Reklamációs_szabályzat_1792493358618.docx", "Reklamációs szabályzat", "A Freshkom reklamációs szabályzata: panaszbejelentés, hibákért való felelősség, ügyintézés és reklamációs űrlapminta."),
    },
}
PATHS = {"terms": "/vseobecne-obchodne-podmienky", "privacy": "/ochrana-osobnych-udajov", "complaints": "/reklamacny-poriadok"}


def text(element):
    return "".join(
        node.text or "" if node.tag == W + "t" else
        "\n" if node.tag in (W + "br", W + "cr") else
        "\t" if node.tag == W + "tab" else ""
        for node in element.iter()
    ).strip()


def slug(value):
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def parse(source):
    with zipfile.ZipFile(source) as archive:
        body = ET.fromstring(archive.read("word/document.xml")).find("w:body", NS)
        styles = ET.fromstring(archive.read("word/styles.xml"))
        style_numbers = {
            s.get(W + "styleId"): s.find("w:pPr/w:numPr", NS)
            for s in styles.findall("w:style", NS)
        }
        numbering = ET.fromstring(archive.read("word/numbering.xml"))
        abstracts = {n.get(W + "abstractNumId"): n for n in numbering.findall("w:abstractNum", NS)}
        numbers = {}
        for num in numbering.findall("w:num", NS):
            abstract = abstracts[num.find("w:abstractNumId", NS).get(W + "val")]
            levels = {}
            for level in abstract.findall("w:lvl", NS):
                levels[int(level.get(W + "ilvl"))] = {
                    "format": level.find("w:numFmt", NS).get(W + "val"),
                    "label": level.find("w:lvlText", NS).get(W + "val"),
                    "start": int(level.find("w:start", NS).get(W + "val")),
                }
            for override in num.findall("w:lvlOverride", NS):
                start = override.find("w:startOverride", NS)
                if start is not None:
                    levels[int(override.get(W + "ilvl"))]["start"] = int(start.get(W + "val"))
            numbers[num.get(W + "numId")] = levels
        blocks = []
        counters = {}
        document_title = None
        for element in body:
            if element.tag == W + "tbl":
                rows = [[ "\n".join(text(p) for p in cell.findall("w:p", NS)) for cell in row.findall("w:tc", NS)] for row in element.findall("w:tr", NS)]
                blocks.append({"type": "table", "rows": rows})
                continue
            if element.tag != W + "p":
                continue
            value = text(element)
            if not value:
                continue
            if value.casefold() == "pre služby pod obchodnou značkou freshkom":
                continue
            if document_title is None:
                document_title = value
                continue
            style_node = element.find("w:pPr/w:pStyle", NS)
            style = style_node.get(W + "val") if style_node is not None else ""
            runs = [r for r in element.findall(".//w:r", NS) if text(r)]
            fully_bold = runs and all(r.find("w:rPr/w:b", NS) is not None and r.find("w:rPr/w:b", NS).get(W + "val") != "0" for r in runs)
            heading = style.startswith(("Nadpis", "Heading")) or (
                fully_bold and "\n" not in value and len(value) < 180 and not value.endswith(":") and
                not value.startswith("pre služby pod") and
                not re.match(r"^(Účinnosť|Posledná|Hatálybalépés|Utolsó|Právny základ|Jogalap|Doba uchovávania|Tárolási idő)", value)
            ) or bool(re.match(r"^(Príloha č\.|[12]\. melléklet)", value))
            if heading:
                blocks.append({"type": "heading", "text": value, "level": 3 if style in ("Nadpis2", "Heading2") else 2, "id": f"section-{len(blocks)}-{slug(value)[:65]}"})
                continue
            num = element.find("w:pPr/w:numPr", NS)
            if num is None:
                num = style_numbers.get(style)
            if num is not None and num.find("w:numId", NS) is not None:
                number_id = num.find("w:numId", NS).get(W + "val")
                level_node = num.find("w:ilvl", NS)
                level = int(level_node.get(W + "val")) if level_node is not None else 0
                spec = numbers.get(number_id, {}).get(level)
                if spec and spec["format"] == "bullet":
                    if blocks and blocks[-1]["type"] == "list":
                        blocks[-1]["items"].append(value)
                    else:
                        blocks.append({"type": "list", "items": [value], "ordered": False})
                    continue
                if spec:
                    key = (number_id, level)
                    counters[key] = counters.get(key, spec["start"] - 1) + 1
                    for lower in range(level + 1, 9):
                        counters.pop((number_id, lower), None)
                    label = re.sub(r"%([1-9])", lambda m: str(counters.get((number_id, int(m[1]) - 1), 1)), spec["label"])
                    value = f"{label} {value}"
            blocks.append({"type": "paragraph", "text": value})
        # Word places article labels and their titles in separate paragraphs.
        # Keep both words, but expose one useful heading / contents link.
        merged = []
        i = 0
        while i < len(blocks):
            block = blocks[i]
            if (block["type"] == "heading" and
                re.fullmatch(r"(Článok [IVX]+|[IVX]+\. cikk|[12]\. melléklet)", block["text"]) and
                i + 1 < len(blocks) and blocks[i + 1]["type"] == "heading"):
                block["text"] += "\n" + blocks[i + 1]["text"]
                i += 1
            merged.append(block)
            i += 1
        return document_title, merged


def main():
    documents = {}
    output = WEB / "public/documents"
    output.mkdir(parents=True, exist_ok=True)
    for kind, languages in SOURCES.items():
        documents[kind] = {}
        for lang, (filename, title, description) in languages.items():
            source = ROOT / "attached_assets" / filename
            document_title, blocks = parse(source)
            download_name = filename.rsplit("_", 1)[0] + ".docx"
            download_path = f"documents/freshkom-{kind}-{lang}.docx"
            shutil.copyfile(source, WEB / "public" / download_path)
            documents[kind][lang] = {
                "title": title, "documentTitle": document_title,
                "path": PATHS[kind], "description": description,
                "effectiveDate": "2026-10-08" if kind == "complaints" else "2026-10-06",
                "downloadName": download_name, "downloadPath": download_path,
                "fileSize": source.stat().st_size, "blocks": blocks,
            }
            print(kind, lang, len(blocks), "blocks;", source.stat().st_size, "bytes")
    content = WEB / "src/content"
    content.mkdir(parents=True, exist_ok=True)
    (content / "legal-documents.json").write_text(json.dumps(documents, ensure_ascii=False, indent=2) + "\n")
    metadata = {kind: {lang: {key: value for key, value in doc.items() if key != "blocks"} for lang, doc in languages.items()} for kind, languages in documents.items()}
    (content / "legal-metadata.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()

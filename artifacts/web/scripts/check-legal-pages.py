"""Check built legal pages, original downloads, content fidelity and discovery.

Run from the repository root after building:
  python artifacts/web/scripts/check-legal-pages.py
Optionally add --live-base-url https://<development-host> to check HTTP responses.
"""
import argparse
import importlib.util
import json
import re
from html.parser import HTMLParser
from pathlib import Path
import urllib.request
import xml.etree.ElementTree as ET
import zipfile

WEB = Path(__file__).resolve().parents[1]
ROOT = WEB.parents[1]
spec = importlib.util.spec_from_file_location("legal_import", WEB / "scripts/import-legal-documents.py")
importer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(importer)


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.text = []
        self.tags = []
        self.feed(html)

    def handle_data(self, data):
        self.text.append(data)

    def handle_starttag(self, tag, attributes):
        self.tags.append((tag, dict(attributes)))


def normalized(value):
    return re.sub(r"\s+", " ", value).strip()


def check():
    parser = argparse.ArgumentParser()
    parser.add_argument("--live-base-url")
    args = parser.parse_args()
    documents = json.loads((WEB / "src/content/legal-documents.json").read_text())
    rewrites = json.loads((ROOT / "vercel.json").read_text())["rewrites"]
    sitemap = {node.text for node in ET.parse(WEB / "public/sitemap.xml").findall(".//{*}loc")}
    llms = (WEB / "public/llms.txt").read_text()
    for kind, languages in documents.items():
        for lang, doc in languages.items():
            route = ("/hu" if lang == "hu" else "") + doc["path"]
            filename = f"{lang}{doc['path'].replace('/', '-')}.html"
            html = (WEB / "dist" / filename).read_text()
            page = Page(html)
            visible = normalized("".join(page.text))
            source = ROOT / "attached_assets" / importer.SOURCES[kind][lang][0]
            with zipfile.ZipFile(source) as archive:
                tree = ET.fromstring(archive.read("word/document.xml"))
                for paragraph in tree.findall(".//w:body//w:p", importer.NS):
                    original = normalized(importer.text(paragraph))
                    assert not original or original in visible, f"Missing text in {route}: {original[:100]}"
            original_bytes = source.read_bytes()
            for folder in ("public", "dist"):
                assert original_bytes == (WEB / folder / doc["downloadPath"]).read_bytes(), "Changed DOCX"
            assert sum(tag == "h1" for tag, _ in page.tags) == 1, "Expected one h1"
            ids = [attrs["id"] for _, attrs in page.tags if "id" in attrs]
            assert len(ids) == len(set(ids)), "Duplicate IDs"
            for tag, attrs in page.tags:
                if tag == "a" and attrs.get("href", "").startswith("#"):
                    assert attrs["href"][1:] in ids, "Broken section link"
            assert any(tag == "a" and attrs.get("download") == doc["downloadName"] and
                       attrs.get("href") == "/" + doc["downloadPath"] for tag, attrs in page.tags), "Missing download"
            assert any(tag == "link" and attrs.get("rel") == "canonical" and
                       attrs.get("href") == "https://www.freshkom.sk" + route for tag, attrs in page.tags), "Wrong canonical"
            for language in ("sk", "hu", "x-default"):
                assert any(tag == "link" and attrs.get("hreflang") == language for tag, attrs in page.tags)
            assert any(r["source"] == route and r["destination"] == "/" + filename for r in rewrites)
            assert "https://www.freshkom.sk" + route in sitemap and "https://www.freshkom.sk" + route in llms
            assert 'data-prerendered="true"' in html
            assert "DigitalDocument" in html and "BreadcrumbList" in html
            for other in documents.values():
                href = ("/hu" if lang == "hu" else "") + other[lang]["path"]
                assert any(tag == "a" and attrs.get("href") == href for tag, attrs in page.tags), "Missing legal navigation"
            if args.live_base_url:
                base = args.live_base_url.rstrip("/")
                with urllib.request.urlopen(base + route, timeout=30) as response:
                    assert response.status == 200
                    assert doc["documentTitle"] in response.read().decode()
                with urllib.request.urlopen(base + "/" + doc["downloadPath"], timeout=30) as response:
                    assert response.status == 200 and response.read() == original_bytes
                    assert "wordprocessingml.document" in response.headers.get("Content-Type", "")
            print(f"PASS {route}: full text, DOCX, anchors, SEO, navigation, prerender and discovery")
    for lang in ("sk", "hu"):
        page = Page((WEB / "dist" / f"{lang}.html").read_text())
        for documents_by_lang in documents.values():
            doc = documents_by_lang[lang]
            assert doc["title"] in "".join(page.text), "Missing localized homepage footer label"
    print("PASS all six legal pages and both homepage footers")


if __name__ == "__main__":
    check()

import { Link } from "wouter";
import { ChevronRight, Download, FileText, ArrowRight, CalendarDays } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizePath } from "@/seo/routes";
import { legalDocuments, type LegalKind, type LegalDocument } from "@/content/legalDocuments";
import documentContent from "@/content/legal-documents.json";

const KINDS: LegalKind[] = ["terms", "privacy", "complaints"];

function LegalText({ text }: { text: string }) {
  return <>{text.split(/(www\.[^\s<>]+|info@freshkom\.sk)/g).map((part, i) => {
    if (part === "info@freshkom.sk") return <a key={i} href={`mailto:${part}`}>{part}</a>;
    if (!part.startsWith("www.")) return part;
    const address = part.replace(/[.,;:)]+$/, "");
    const trailing = part.slice(address.length);
    const url = new URL(`https://${address}`);
    return <span key={i}>{url.hostname === "www.freshkom.sk"
      ? <Link href={url.pathname + url.search + url.hash}>{address}</Link>
      : <a href={url.href}>{address}</a>}{trailing}</span>;
  })}</>;
}

const UI = {
  sk: {
    home: "Úvod",
    breadcrumb: "Navigácia",
    effective: "Účinné od",
    contents: "Obsah dokumentu",
    download: "Stiahnuť dokument",
    downloadHint: "Úplné znenie dokumentu na stiahnutie",
    format: "Formát DOCX (Microsoft Word)",
    related: "Ďalšie právne dokumenty",
    backTop: "Späť na začiatok",
  },
  hu: {
    home: "Kezdőlap",
    breadcrumb: "Navigáció",
    effective: "Hatályos",
    contents: "Tartalomjegyzék",
    download: "Dokumentum letöltése",
    downloadHint: "A dokumentum teljes szövege letölthető formában",
    format: "DOCX formátum (Microsoft Word)",
    related: "További jogi dokumentumok",
    backTop: "Vissza az elejére",
  },
} as const;

function formatDate(iso: string, lang: "sk" | "hu") {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return lang === "hu" ? `${y}. ${String(m).padStart(2, "0")}. ${String(d).padStart(2, "0")}.` : `${d}. ${m}. ${y}`;
}

function formatSize(bytes: number, lang: "sk" | "hu") {
  const kb = bytes / 1024;
  const value = kb >= 1024 ? kb / 1024 : kb;
  const unit = kb >= 1024 ? "MB" : "kB";
  return `${value.toLocaleString(lang === "hu" ? "hu-HU" : "sk-SK", { maximumFractionDigits: 1 })} ${unit}`;
}

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const { lang } = useLanguage();
  const doc = (documentContent as Record<LegalKind, Record<"sk" | "hu", LegalDocument>>)[kind][lang];
  const ui = UI[lang];
  const toc = doc.blocks.filter(
    (b): b is Extract<(typeof doc.blocks)[number], { type: "heading" }> => b.type === "heading" && b.level === 2,
  );
  const href = `${import.meta.env.BASE_URL}${doc.downloadPath.replace(/^\//, "")}`;

  return (
    <>
      <SeoHead page={kind} />
      <div className="bg-accent/30 border-b border-border/50" id="top">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14">
          <nav aria-label={ui.breadcrumb} className="mb-6 text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
              <li>
                <Link href={localizePath("/", lang)} className="hover:text-primary transition-colors underline-offset-4 hover:underline">
                  {ui.home}
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="text-foreground font-medium">{doc.title}</li>
            </ol>
          </nav>
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4 border border-primary/20">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" /> Freshkom
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 break-words">{doc.documentTitle}</h1>
          {doc.description && <p className="text-base sm:text-lg text-gray-700 max-w-2xl mb-5">{doc.description}</p>}
          <p className="inline-flex items-center gap-2 text-sm text-gray-700">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            {ui.effective}: <time dateTime={doc.effectiveDate} className="font-semibold">{formatDate(doc.effectiveDate, lang)}</time>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {toc.length > 1 && (
          <nav aria-labelledby="legal-toc" className="mb-10 rounded-3xl border border-border/60 bg-white shadow-sm p-5 sm:p-7">
            <h2 id="legal-toc" className="font-bold text-lg mb-4">{ui.contents}</h2>
            <ol className="grid gap-1 sm:grid-cols-2 sm:gap-x-6">
              {toc.map(h => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="flex gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors break-words">
                    <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0">{h.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article className="legal-doc">
          {doc.blocks.map((b, i) => {
            switch (b.type) {
              case "heading":
                return b.level === 2 ? (
                  <h2 key={i} id={b.id}>{b.text}</h2>
                ) : (
                  <h3 key={i} id={b.id}>{b.text}</h3>
                );
              case "paragraph":
                return <p key={i}><LegalText text={b.text} /></p>;
              case "list": {
                const items = b.items.map((it, j) => <li key={j}><LegalText text={it} /></li>);
                return b.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>;
              }
              case "table": {
                const [head, ...body] = b.rows;
                return (
                  <div key={i} className="legal-table">
                    <table>
                      {head && (
                        <thead>
                          <tr>{head.map((c, j) => <th key={j} scope="col">{c}</th>)}</tr>
                        </thead>
                      )}
                      <tbody>
                        {body.map((row, r) => (
                          <tr key={r}>
                            {row.map((c, j) => (
                              <td key={j} data-label={head?.[j] ?? ""}><LegalText text={c} /></td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              default:
                return null;
            }
          })}
        </article>

        <p className="mt-8 text-sm">
          <a href="#top" className="text-primary font-medium hover:underline underline-offset-4">{ui.backTop}</a>
        </p>

        <section aria-labelledby="legal-download" className="mt-10 rounded-3xl bg-foreground text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
            <FileText className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="legal-download" className="font-bold text-lg mb-1">{ui.downloadHint}</h2>
            <p className="text-gray-300 text-sm break-words">{doc.downloadName}</p>
            <p className="text-gray-400 text-sm">{ui.format} · {formatSize(doc.fileSize, lang)}</p>
          </div>
          <a
            href={href}
            download={doc.downloadName}
            type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="inline-flex items-center justify-center gap-2 min-h-12 rounded-full bg-primary text-white font-semibold px-6 py-3 hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            {ui.download} <span className="sr-only">({doc.downloadName}, DOCX, {formatSize(doc.fileSize, lang)})</span>
          </a>
        </section>

        <nav aria-labelledby="legal-related" className="mt-10">
          <h2 id="legal-related" className="font-bold text-lg mb-4">{ui.related}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {KINDS.filter(k => k !== kind).map(k => {
              const other = legalDocuments[k][lang];
              return (
                <li key={k}>
                  <Link href={localizePath(other.path, lang)} className="group flex items-center justify-between gap-3 h-full rounded-2xl border border-border/60 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                    <span className="font-semibold group-hover:text-primary transition-colors">{other.title}</span>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

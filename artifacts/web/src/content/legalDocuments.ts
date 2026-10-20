import documents from "./legal-metadata.json";

export type LegalKind = "terms" | "privacy" | "complaints";
export type LegalBlock =
  | { type: "heading"; text: string; level: 2 | 3; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "table"; rows: string[][] };

export interface LegalDocument {
  title: string;
  documentTitle: string;
  path: string;
  description: string;
  effectiveDate: string;
  downloadPath: string;
  downloadName: string;
  fileSize: number;
  blocks: LegalBlock[];
}

export const legalDocuments = documents as Record<LegalKind, Record<"sk" | "hu", Omit<LegalDocument, "blocks">>>;

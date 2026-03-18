import { buildLeadEmailHtml } from "@workspace/email-template";

const sampleLead = {
  name: "Ján Novák",
  phone: "+421 905 771 151",
  email: "jan.novak@email.sk",
  service: "tepovanie-kobercov",
  message: "Mám záujem o vytepovanie rohovej sedačky a jedného koberca v obývacej izbe. Byt je na 3. poschodí bez výťahu.",
};

export function email() {
  const html = buildLeadEmailHtml(sampleLead);
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <p className="text-xs text-gray-400 mb-4 tracking-wide uppercase">Náhľad — notifikačný email</p>
      <div
        style={{ maxWidth: 640, width: "100%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

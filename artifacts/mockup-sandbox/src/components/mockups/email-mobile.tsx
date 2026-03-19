const serviceLabels: Record<string, string> = {
  "tepovanie-gaucov": "Tepovanie gaučov a sedačiek",
  "tepovanie-kobercov": "Tepovanie kobercov",
  "tepovanie-matracov": "Tepovanie matracov",
  "tepovanie-aut": "Tepovanie áut",
  "cistenie-caluneneho-nabytku": "Čistenie čalúneného nábytku",
  "umyvanie-okien": "Umývanie okien a výkladov",
  "hlbkove-cistenie": "Hĺbkové čistenie",
  ine: "Iné / Zmiešané",
};

const lead = {
  name: "Ján Novák",
  phone: "+421 905 771 151",
  email: "jan.novak@email.sk",
  service: "tepovanie-kobercov",
  message: "Mám záujem o vytepovanie rohovej sedačky a jedného koberca v obývacej izbe.",
};

const serviceLabel = serviceLabels[lead.service] ?? lead.service;

const html = `
<div style="font-family:Arial,sans-serif;max-width:390px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
  <div style="background:#0d7577;padding:18px 20px">
    <h1 style="color:#fff;margin:0;font-size:18px">🚀 Nový dopyt — Freshkom</h1>
  </div>
  <div style="padding:20px;background:#fff">
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:90px;font-size:13px;vertical-align:top">Meno</td>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:14px">${lead.name}</td>
      </tr>
      <tr>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;vertical-align:top">Telefón</td>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:14px">
          <a href="tel:${lead.phone}" style="color:#0d7577;text-decoration:none">${lead.phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;vertical-align:top">Email</td>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;font-size:14px">
          <a href="mailto:${lead.email}" style="color:#0d7577;text-decoration:none;word-break:break-all">${lead.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;vertical-align:top">Služba</td>
        <td style="padding:9px 0;border-bottom:1px solid #f3f4f6;font-size:14px">${serviceLabel}</td>
      </tr>
      <tr>
        <td style="padding:9px 0;color:#6b7280;font-size:13px;vertical-align:top">Správa</td>
        <td style="padding:9px 0;font-size:14px;white-space:pre-wrap">${lead.message}</td>
      </tr>
    </table>
    <table style="margin-top:20px;border-collapse:collapse;width:100%;text-align:center">
      <tr>
        <td style="padding:0 0 8px 0;display:block">
          <a href="tel:${lead.phone}" style="display:block;background:#0d7577;color:#fff;padding:13px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;line-height:1.2;text-align:center;border:2px solid transparent">📞 Zavolať ${lead.name}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:0">
          <a href="mailto:${lead.email}" style="display:block;background:#fff;color:#0d7577;padding:13px 16px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;line-height:1.2;text-align:center;border:2px solid #0d7577">✉️ Odpovedať emailom</a>
        </td>
      </tr>
    </table>
  </div>
  <div style="padding:14px 20px;background:#f9fafb;font-size:11px;color:#9ca3af;text-align:center">
    Freshkom · info@freshkom.sk · +421 917 240 819
  </div>
</div>`.trim();

export function emailMobile() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <p className="text-xs text-gray-400 mb-4 tracking-wide uppercase">Náhľad — mobil</p>
      <div
        style={{ maxWidth: 390, width: "100%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

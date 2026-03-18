export function EmailNotification() {
  const lead = {
    name: "Ján Novák",
    phone: "+421 905 771 151",
    email: "jan.novak@email.sk",
    service: "tepovanie-kobercov",
    message: "Mám záujem o vytepovanie rohovej sedačky a jedného koberca v obývacej izbe. Byt je na 3. poschodí bez výťahu.",
  };

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
  <div style="background:#0d7577;padding:24px 28px">
    <h1 style="color:#fff;margin:0;font-size:22px">🚀 Nový dopyt — Freshkom</h1>
  </div>
  <div style="padding:28px;background:#fff">
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:130px;font-size:14px">Meno</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:15px">${lead.name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Telefón</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;font-size:15px">
          <a href="tel:${lead.phone}" style="color:#0d7577;text-decoration:none">${lead.phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Email</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:15px">
          <a href="mailto:${lead.email}" style="color:#0d7577;text-decoration:none">${lead.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:14px">Služba</td>
        <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-size:15px">${lead.service}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Správa</td>
        <td style="padding:10px 0;font-size:15px;white-space:pre-wrap">${lead.message}</td>
      </tr>
    </table>
    <table style="margin-top:24px;border-collapse:collapse">
      <tr>
        <td style="padding:0 12px 0 0;vertical-align:middle">
          <a href="tel:${lead.phone}" style="display:inline-block;background:#0d7577;color:#fff;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;line-height:1.2;vertical-align:middle;border:2px solid transparent">📞 Zavolať ${lead.name}</a>
        </td>
        <td style="padding:0;vertical-align:middle">
          <a href="mailto:${lead.email}" style="display:inline-block;background:#fff;color:#0d7577;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;line-height:1.2;vertical-align:middle;border:2px solid #0d7577">✉️ Odpovedať emailom</a>
        </td>
      </tr>
    </table>
  </div>
  <div style="padding:16px 28px;background:#f9fafb;font-size:12px;color:#9ca3af;text-align:center">
    Freshkom · info@freshkom.sk · +421 917 240 819
  </div>
</div>`.trim();

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

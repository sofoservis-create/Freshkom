/** Use the public host that serves the page, even if an older env value names the apex. */
export function siteUrl(configured?: string): string {
  const url = (configured || "https://www.freshkom.sk").replace(/\/$/, "");
  return url === "https://freshkom.sk" ? "https://www.freshkom.sk" : url;
}
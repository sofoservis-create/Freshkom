import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const artifactDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(artifactDir, "dist");
const serverDir = path.join(dist, "server");
const { renderPage } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);

const paths = ["", "-cennik", "-kontakt", "-tepovanie-komarno", "-cistenie-okien-komarno"];
for (const lang of ["sk", "hu"]) {
  for (const suffix of paths) {
    const file = path.join(dist, `${lang}${suffix}.html`);
    const route = `${lang === "hu" ? "/hu" : ""}${suffix.replace("-", "/")}` || "/";
    const html = fs.readFileSync(file, "utf8");
    const content = renderPage(route);
    if (!content.includes("<main")) throw new Error(`Missing page content for ${route}`);
    const updated = html.replace(
      /<!--app-start-->[\s\S]*?<!--app-end-->/,
      `<!--app-start--><div id="root" data-prerendered="true">${content}</div><!--app-end-->`,
    );
    if (updated === html) throw new Error(`Missing root markers in ${file}`);
    fs.writeFileSync(file, updated);
    if (lang === "sk" && !suffix) fs.writeFileSync(path.join(dist, "index.html"), updated);
  }
}
fs.rmSync(serverDir, { recursive: true });
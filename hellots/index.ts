import * as data from "./main.json";
import * as schema from "./schema.json";
import * as fs from "fs";

for (const component in data.$jason) {
  console.log(component);
  if (component == "body") {
    for (const bodyComponent of component) {
      console.log(bodyComponent);
    }
  }
}

let p: string = `<p>${JSON.stringify(data.$jason)}</p>`;
const title: string = "<title>Jasonelle app</title>";
let body: string = `<body>${p}</body>`;
let head: string = `<head>${title}</head>`;
let html: string = `<html>${head}${body}</html>`;

fs.writeFileSync("hellots/index.html", html);

import * as data from "./hello.json";
import * as fs from "fs";

let p: string = `<p>${JSON.stringify(data.$jason)}</p>`;
const title: string = "<title>Jasonelle app</title>";
let body: string = `<body>${p}</body>`;
let head: string = `<head>${title}</head>`;
let html: string = `<html>${head}${body}</html>`;

fs.writeFileSync("hellots/index.html", html);

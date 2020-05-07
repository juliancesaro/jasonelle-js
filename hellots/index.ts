import * as data from "./hello.json";
import * as schema from "./schema.json";
import * as fs from "fs";
//import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';

for (const component in data.$jason) {
  switch(component) { 
    case "head": { 
      console.log("head")
      break; 
    } 
    case "body": {  
      console.log("head")
      break; 
    } 
    default: { 
      console.log('default');
      break; 
    } 
  } 
}

// let p: string = `<p>${JSON.stringify(data.$jason)}</p>`;
// const title: string = "<title>Jasonelle app</title>";
// let body: string = `<body>${p}</body>`;
// let head: string = `<head>${title}</head>`;
// let html: string = `<html>${head}${body}</html>`;

// fs.writeFileSync("hellots/index.html", html);

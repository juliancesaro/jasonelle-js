"use strict";
exports.__esModule = true;
//import * as schema from "./schema.json";
var Validator = require("jsonschema").Validator;
var v = new Validator();
// Address, to be embedded on Person
var addressSchema = {
    id: "/SimpleAddress",
    type: "object",
    properties: {
        lines: {
            type: "array",
            items: { type: "string" }
        },
        zip: { type: "string" },
        city: { type: "string" },
        country: { type: "string" }
    },
    required: ["country"]
};
// Person
var schema = {
    id: "/SimplePerson",
    type: "object",
    properties: {
        name: { type: "string" },
        address: { $ref: "/SimpleAddress" },
        votes: { type: "integer", minimum: 1 }
    }
};
var p = {
    name: "Barack Obama",
    m: {
        mimes: ["1600 Pennsylvania Avenue Northwest"],
        zip: "DC 20500",
        city: "Washington",
        country: "USA"
    },
    votes: 3
};
v.addSchema(addressSchema, "/SimpleAddress");
console.log(v.validate(p, schema));
// for (const component in data.$jason) {
//   switch (component) {
//     case "head": {
//       console.log("head");
//       break;
//     }
//     case "body": {
//       console.log("head");
//       break;
//     }
//     default: {
//       console.log("default");
//       break;
//     }
//   }
// }
// let p: string = `<p>${JSON.stringify(data.$jason)}</p>`;
// const title: string = "<title>Jasonelle app</title>";
// let body: string = `<body>${p}</body>`;
// let head: string = `<head>${title}</head>`;
// let html: string = `<html>${head}${body}</html>`;
// fs.writeFileSync("hellots/index.html", html);

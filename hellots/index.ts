import * as data from "./hello.json";
import * as fs from "fs";

var foo =
  "<html><head></head><body><p>" +
  JSON.stringify(data.$jason) +
  "</p></body></html>";

fs.writeFileSync("hellots/index.html", foo);

//console.log(data.$jason.body);

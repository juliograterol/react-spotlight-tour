const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "src", "styles.css");
const targets = [
  path.join(__dirname, "..", "dist", "esm", "styles.css"),
  path.join(__dirname, "..", "dist", "cjs", "styles.css"),
];

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(src, target);
  console.log(`Copied styles.css -> ${path.relative(process.cwd(), target)}`);
}

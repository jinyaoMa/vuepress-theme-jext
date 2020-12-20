let fontCarrier = require("font-carrier");
let fs = require("fs");
let path = require("path");

const len = 1024;

const font = fontCarrier.create({
  id: "j-icon",
  horizAdvX: len,
  vertAdvY: len
});

font.setFontface({
  fontFamily: "j-icon",
  unitsPerEm: len,
  ascent: 0.8 * len,
  descent: -0.2 * len
});

if (!fs.existsSync(path.resolve(__dirname, "./dist/"))) {
  fs.mkdirSync(path.resolve(__dirname, "./dist/"));
}

const svgPath = path.resolve(__dirname, "./src/");

const cssTemplatePath = path.resolve(__dirname, "./template.styl");

const targetFontsPath = path.resolve(__dirname, "./dist/j-icon");

const targetCssPath = path.resolve(__dirname, "./dist/j-icon.styl");

const fontFamilyClass = "j-icon";

const prefix = `${fontFamilyClass}-`;

const uniOffset = 0x78;

fs.readdir(svgPath, (err, files) => {
  if (err) {
    return console.error(err);
  }

  let css = fs.readFileSync(cssTemplatePath).toString();
  files.forEach((file, i) => {
    if (file.endsWith(".svg")) {
      let fPath = path.resolve(svgPath, file);
      let num = (uniOffset + i).toString(16);
      let svg = fs.readFileSync(fPath).toString();
      let className = prefix + file.replace(".svg", "");
      font.setSvg(`&#x${num};`, svg);
      css += `\n.${className}:before\n  content '\\${num}'\n`;
    }
  });

  font.output({
    path: targetFontsPath
  });

  fs.writeFileSync(targetCssPath, css);
});

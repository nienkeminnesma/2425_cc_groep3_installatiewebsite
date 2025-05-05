const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "../build");
const verhalenHtmlPath = path.resolve(buildDir, "verhalen.html");
const publicVerhalenHtml = path.resolve(__dirname, "../public/verhalen.html");

// Load original verhalen.html from public
let html = fs.readFileSync(publicVerhalenHtml, "utf-8");

// Find hashed JS and CSS files
const jsFiles = fs.readdirSync(path.join(buildDir, "static/js")).filter(f => f.endsWith(".js"));
const cssFiles = fs.readdirSync(path.join(buildDir, "static/css")).filter(f => f.endsWith(".css"));

const mainJs = jsFiles.find(f => f.startsWith("main.") && f.endsWith(".js"));
const mainCss = cssFiles.find(f => f.startsWith("main.") && f.endsWith(".css"));

// Inject them into the HTML (you can customize where)
/*html = html.replace(
  "</head>",
  `<link rel="stylesheet" href="/static/css/${mainCss}">\n</head>`
);*/
html = html.replace(
  `<script src="/static/js/bundle.js"></script>`,
  `<script src="/static/js/${mainJs}"></script>`
);

// Save to build/verhalen.html
fs.writeFileSync(verhalenHtmlPath, html, "utf-8");

console.log("✅ Injected assets into verhalen.html");

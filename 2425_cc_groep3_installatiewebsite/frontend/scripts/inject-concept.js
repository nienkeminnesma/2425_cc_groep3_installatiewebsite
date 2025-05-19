const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "../build");
const conceptHtmlPath = path.resolve(buildDir, "concept.html");
const publicconceptHtml = path.resolve(__dirname, "../public/concept.html");

// Load original concept.html from public
let html = fs.readFileSync(publicconceptHtml, "utf-8");

// Find hashed JS and CSS files
const jsFiles = fs.readdirSync(path.join(buildDir, "static/js")).filter(f => f.endsWith(".js"));
const cssFiles = fs.readdirSync(path.join(buildDir, "static/css")).filter(f => f.endsWith(".css"));

const mainJs = jsFiles.find(f => f.startsWith("main.") && f.endsWith(".js"));
const mainCss = cssFiles.find(f => f.startsWith("main.") && f.endsWith(".css"));

// Inject them into the HTML (you can customize where)
html = html.replace(
  "</head>",
  `<link rel="stylesheet" href="/static/css/${mainCss}">\n</head>`
);
html = html.replace(
  `<script src="/static/js/bundle.js"></script>`,
  `<script src="/static/js/${mainJs}"></script>`
);

// Save to build/concept.html
fs.writeFileSync(conceptHtmlPath, html, "utf-8");

console.log("✅ Injected assets into concept.html");

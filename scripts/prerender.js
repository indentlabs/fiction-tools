// Pre-render script: bundles the React app for Node via esbuild,
// renders every route to static HTML, and writes the files into build/.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const BUNDLE_PATH = path.join(__dirname, '..', '.prerender-bundle.cjs');

// Step 1: Bundle the prerender entry point for Node with esbuild
console.log('Bundling prerender entry for Node...');
execSync(
  `npx esbuild scripts/prerender-entry.jsx ` +
  `--bundle ` +
  `--platform=node ` +
  `--format=cjs ` +
  `--outfile=${BUNDLE_PATH} ` +
  `--loader:.css=empty ` +
  `--loader:.png=empty ` +
  `--loader:.svg=empty ` +
  `--loader:.jpg=empty ` +
  `--loader:.gif=empty ` +
  `--loader:.js=jsx ` +
  `--jsx=automatic ` +
  `--external:canvas`,
  { stdio: ['pipe', 'pipe', 'inherit'] }
);

// Step 2: Run the bundled script to get rendered HTML for all routes
console.log('Rendering all routes...');
const output = execSync(`node ${BUNDLE_PATH}`, {
  maxBuffer: 50 * 1024 * 1024, // 50MB for large output
  encoding: 'utf-8',
});
const results = JSON.parse(output);

// Step 3: Read the built index.html as template and save a copy for 404.html
const templatePath = path.join(BUILD_DIR, 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');
// Save the original template as 404.html now (before we overwrite index.html).
// GitHub Pages serves 404.html for unmatched paths, which loads the SPA shell
// and lets React Router handle the route client-side.
fs.writeFileSync(path.join(BUILD_DIR, '404.html'), template);

// Step 4: For each route, inject rendered HTML and meta tags into the template
let count = 0;
for (const [route, data] of Object.entries(results)) {
  // Determine output path
  let filePath;
  if (route === '/') {
    filePath = path.join(BUILD_DIR, 'index.html');
  } else {
    filePath = path.join(BUILD_DIR, route.slice(1), 'index.html');
  }

  // Inject rendered HTML into <div id="root">
  let html = template.replace(
    '<div id="root"></div>',
    '<div id="root">' + data.html + '</div>'
  );

  // Replace <title> tag
  if (data.title) {
    html = html.replace(/<title>[^<]*<\/title>/, data.title);
  }

  // Inject meta tags (replace the static description meta with dynamic ones)
  if (data.meta) {
    // Remove existing OG/Twitter/description meta tags that helmet will replace
    html = html.replace(/<meta\s+name="description"[^>]*>/g, '');
    html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/g, '');
    html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '');
    // Insert helmet meta tags before </head>
    html = html.replace('</head>', data.meta + '\n' + data.link + '\n</head>');
  }

  // Ensure directory exists
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(filePath, html);
  count++;
}

// Cleanup
fs.unlinkSync(BUNDLE_PATH);

console.log('Pre-rendered ' + count + ' routes into build/');

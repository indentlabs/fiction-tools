const fs = require('fs');
const path = require('path');

const worldbuilding = require('../src/data/worldbuilding.json');
const writing = require('../src/data/writing.json');
const revising = require('../src/data/revising.json');
const publishing = require('../src/data/publishing.json');

const SITE_URL = 'https://www.fiction.tools';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const urls = [];

// Static pages
urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
urls.push({ loc: '/guides', priority: '0.8', changefreq: 'weekly' });

// Dynamic pages from tool data
const allData = [worldbuilding, writing, revising, publishing];

allData.forEach((categoryData) => {
  categoryData.forEach((section) => {
    // Guide pages
    const sectionSlug = generateSlug(section.section);
    urls.push({ loc: '/best/' + sectionSlug, priority: '0.7', changefreq: 'weekly' });

    // Individual tool pages
    section.tools.forEach((tool) => {
      if (!tool.title || tool.title === '') return;
      const toolSlug = generateSlug(tool.title);
      urls.push({ loc: '/tools/' + toolSlug, priority: '0.6', changefreq: 'monthly' });
    });
  });
});

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('Generated sitemap.xml with ' + urls.length + ' URLs');

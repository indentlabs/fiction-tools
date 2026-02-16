// This file is bundled by esbuild and executed in Node to pre-render routes.
// It uses ReactDOMServer + StaticRouter to generate HTML for each route,
// and react-helmet-async to capture per-page meta tags.

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Layout from '../src/components/Layout/Layout.js';
import ScrollToTop from '../src/components/ScrollToTop.js';
import HomePage from '../src/pages/HomePage.js';
import ToolPage from '../src/pages/ToolPage.js';
import ComparePage from '../src/pages/ComparePage.js';
import GuidePage, { GuidesIndexPage } from '../src/pages/GuidePage.js';
import NotFoundPage from '../src/pages/NotFoundPage.js';
import { Routes, Route } from 'react-router-dom';
import { getAllTools, getAllSections } from '../src/utils/toolData.js';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
        <Route path="/compare/:slugs" element={<ComparePage />} />
        <Route path="/best/:sectionSlug" element={<GuidePage />} />
        <Route path="/guides" element={<GuidesIndexPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

function renderRoute(urlPath) {
  const helmetContext = {};
  const html = renderToString(
    React.createElement(HelmetProvider, { context: helmetContext },
      React.createElement(StaticRouter, { location: urlPath },
        React.createElement(App)
      )
    )
  );
  const { helmet } = helmetContext;
  return { html, helmet };
}

// Collect all routes to pre-render
const routes = ['/'];

// Guide index
routes.push('/guides');

// All section guide pages
getAllSections().forEach((section) => {
  routes.push('/best/' + section.slug);
});

// All tool pages
getAllTools().forEach((tool) => {
  routes.push('/tools/' + tool.slug);
});

// Output JSON with all rendered routes
const results = {};
for (const route of routes) {
  try {
    const { html, helmet } = renderRoute(route);
    results[route] = {
      html,
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
    };
  } catch (err) {
    console.error('Failed to render ' + route + ': ' + err.message);
  }
}

// Write results to stdout as JSON
process.stdout.write(JSON.stringify(results));

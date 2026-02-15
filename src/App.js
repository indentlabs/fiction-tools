import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout.js';
import HomePage from './pages/HomePage.js';
import ToolPage from './pages/ToolPage.js';
import ComparePage from './pages/ComparePage.js';
import GuidePage, { GuidesIndexPage } from './pages/GuidePage.js';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/compare/:slugs" element={<ComparePage />} />
          <Route path="/best/:sectionSlug" element={<GuidePage />} />
          <Route path="/guides" element={<GuidesIndexPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

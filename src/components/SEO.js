import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.fiction.tools';
const DEFAULT_TITLE = 'Fiction.Tools — The best tools for your writing process';
const DEFAULT_DESCRIPTION = 'A living list of specialized tools to help authors at every stage of the writing process.';
const DEFAULT_IMAGE = 'https://www.fiction.tools/asimov.png';

function SEO({ title, description, path, image, type = 'website' }) {
  const fullTitle = title ? `${title} — Fiction.Tools` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@IndentLabs" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}

export default SEO;

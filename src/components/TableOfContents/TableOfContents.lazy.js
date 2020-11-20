import React, { lazy, Suspense } from 'react';

const LazyTableOfContents = lazy(() => import('./TableOfContents'));

const TableOfContents = props => (
  <Suspense fallback={null}>
    <LazyTableOfContents {...props} />
  </Suspense>
);

export default TableOfContents;

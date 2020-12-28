import React, { lazy, Suspense } from 'react';

const LazyBadgeHighlighter = lazy(() => import('./BadgeHighlighter'));

const BadgeHighlighter = props => (
  <Suspense fallback={null}>
    <LazyBadgeHighlighter {...props} />
  </Suspense>
);

export default BadgeHighlighter;

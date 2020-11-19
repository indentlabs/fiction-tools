import React, { lazy, Suspense } from 'react';

const LazyToolCard = lazy(() => import('./ToolCard'));

const ToolCard = props => (
  <Suspense fallback={null}>
    <LazyToolCard {...props} />
  </Suspense>
);

export default ToolCard;

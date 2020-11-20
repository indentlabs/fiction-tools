import React, { lazy, Suspense } from 'react';

const LazyToolList = lazy(() => import('./ToolList'));

const ToolList = props => (
  <Suspense fallback={null}>
    <LazyToolList {...props} />
  </Suspense>
);

export default ToolList;

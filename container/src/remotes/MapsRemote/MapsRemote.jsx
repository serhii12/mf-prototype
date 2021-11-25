import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    import('maps/MapsApp')
      .then(({ mount }) => mount(ref.current))
      .catch(() => {
        throw new Error('MapsApp remote failed to load!');
      });
  }, []);

  return <div ref={ref} />;
};

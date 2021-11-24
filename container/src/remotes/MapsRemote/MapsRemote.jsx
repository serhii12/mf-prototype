import React, { useRef, useEffect } from 'react';
import { mount as remoteMount } from 'maps/MapsApp';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    remoteMount(ref.current);
  }, []);

  return <div ref={ref} />;
};

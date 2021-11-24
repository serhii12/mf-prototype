import { mount as remoteMount } from 'customers/CustomersApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    remoteMount(ref.current);
  }, []);

  return <div ref={ref} />;
};

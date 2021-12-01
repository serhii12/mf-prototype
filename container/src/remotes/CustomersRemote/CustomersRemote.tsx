import React, { useRef, useEffect } from 'react';
export default (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    import('customers/CustomersApp')
      .then(({ mount }) => mount(ref.current))
      .catch(() => {
        throw new Error('Customers remote failed to load!');
      });
  }, []);

  return <div ref={ref} />;
};

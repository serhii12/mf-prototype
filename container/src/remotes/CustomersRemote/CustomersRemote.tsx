import React, { useRef, useEffect } from 'react';
import messengingService from '@core/utils/messengingService';

export default (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    import('customers/CustomersApp')
      .then(({ mount }) =>
        mount(ref.current, {
          subscribe: messengingService.subscribe,
          sendMessageToHost: messengingService.sendMessageToHost
        })
      )
      .catch(() => {
        throw new Error('Customers remote failed to load!');
      });
  }, []);

  return <div ref={ref} />;
};

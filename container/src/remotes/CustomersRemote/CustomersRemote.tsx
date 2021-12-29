import React, { useRef, useEffect } from 'react';
// import messagingService from '@core/utils/messagingService';

export default (): JSX.Element => {
  const ref = useRef(null);

  useEffect(() => {
    // import('customers/CustomersApp')
    //   .then(({ mount }) =>
    //     mount(ref.current, {
    //       subscribe: messagingService.subscribe,
    //       sendMessageToHost: messagingService.sendMessageToHost
    //     })
    //   )
    //   .catch(() => {
    //     throw new Error('Customers remote failed to load!');
    //   });
  }, []);

  return <div ref={ref} />;
};

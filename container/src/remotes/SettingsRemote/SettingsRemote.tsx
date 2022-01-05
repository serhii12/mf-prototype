import React, { useRef, useEffect, useState } from 'react';
import messagingService from '@core/utils/messagingService';
import { LOAD_MF } from '@core/utils/mf_helpers';

export default (): JSX.Element => {
  const [MFStatus, setMFStatus] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    LOAD_MF('settings/SettingsApp')
      .then(({ mount }) =>
        mount(ref.current, {
          subscribe: messagingService.subscribe,
          sendMessageToHost: messagingService.sendMessageToHost
        })
      )
      .catch(() => {
        setMFStatus({ status: 'error', message: 'Something went wrong' });
        throw new Error('Settings remote failed to load!');
      });
  }, []);

  return (
    <>
      <div ref={ref} />
      {MFStatus?.status === 'error' && MFStatus?.message}
    </>
  );
};

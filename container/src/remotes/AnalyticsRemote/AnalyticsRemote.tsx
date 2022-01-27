import React, { useRef, useEffect, useState, useMemo } from 'react';
import messagingService from '@core/utils/messagingService';
import { LOAD_MF } from '@core/utils/mf_helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useAction from '@core/utils/hooks/useAction';

export default (): JSX.Element => {
  const [MFStatus, setMFStatus] = useState(null);
  const ref = useRef(null);
  const locationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { requestSignOut } = useAction();

  const onNavigate = (nextLocation) => {
    if (locationRef.current.pathname !== nextLocation.location.pathname) {
      if (nextLocation.location.pathname === '/') {
        navigate('/analytics');
      } else {
        navigate(nextLocation.location.pathname);
      }
    }
  };

  const messagingServiceObj = useMemo(
    () => ({
      subscribe: messagingService.subscribe,
      sendMessageToHost: messagingService.sendMessageToHost
    }),
    []
  );

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    LOAD_MF('analytics/AnalyticsApp')
      .then(({ mount }) => {
        mount({
          el: ref.current,
          messagingService: messagingServiceObj,
          onNavigate,
          initialPath: locationRef.current.pathname
        });
      })
      .catch(() => {
        setMFStatus({ status: 'error', message: 'Something went wrong' });
        throw new Error('Analytics remote failed to load!');
      });
  }, []);

  return (
    <>
      <div ref={ref} />
      {MFStatus?.status === 'error' && MFStatus?.message}

      <Link to="/login">Login</Link>
      <button onClick={requestSignOut}>Sign out</button>
    </>
  );
};

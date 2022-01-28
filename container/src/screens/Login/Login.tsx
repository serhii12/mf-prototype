import React, { useCallback } from 'react';
import LoginForm from '@core/components/Forms/LoginForm';
import useAction from '@core/utils/hooks/useAction';
import { LoginCredentialTypes } from '@ts/types/auth.types';
import { NotificationStore } from '@gourban/ui-components';

const Login = () => {
  const { requestUserLogin } = useAction();

  const onSubmit = useCallback(
    (values: LoginCredentialTypes) => requestUserLogin(values),
    [requestUserLogin]
  );

  const triggerNotification = () => {
    NotificationStore.addNotification({ content: 'Test', title: 'Success', type: 'info' });
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
      <button onClick={triggerNotification}>Trigger notification</button>
    </>
  );
};

export default Login;

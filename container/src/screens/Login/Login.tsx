import React, { useCallback } from 'react';
import LoginForm from '@core/components/Forms/LoginForm';
import useAction from '@core/utils/hooks/useAction';
import { LoginCredentialTypes } from '@ts/types/auth.types';

const Login = () => {
  const { requestUserLogin } = useAction();

  const onSubmit = useCallback(
    (values: LoginCredentialTypes) => requestUserLogin(values),
    [requestUserLogin]
  );

  return <LoginForm onSubmit={onSubmit} />;
};

export default Login;

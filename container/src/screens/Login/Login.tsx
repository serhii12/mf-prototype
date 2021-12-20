import React from 'react';
import LoginForm from '@core/components/Forms/LoginForm';

const Login = () => {
  const onSubmit = (values): void => {
    // Handles on submit
    console.info(values);
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default Login;

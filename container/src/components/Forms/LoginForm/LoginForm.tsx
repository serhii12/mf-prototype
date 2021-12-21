import React, { FormEvent, memo } from 'react';
import { Formik, Form } from 'formik';
import { FormElements } from '@gourban/ui-components';

interface LoginFormInterface {
  onSubmit: React.FormEventHandler<FormEvent>;
}

interface Values {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormInterface> = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors = {
          username: undefined
        };
        if (values?.username?.length > 2) {
          errors.username = 'Sorry.';
        }

        return errors;
      }}
      onSubmit={(values: Values) => {
        console.error(values);
      }}
    >
      <Form>
        <FormElements.Text
          name="username"
          fieldAttr={{ id: 'username', placeholder: 'Enter username...' }}
          fieldProps={{ label: 'Username' }}
        />
        <button>Test</button>
      </Form>
    </Formik>
  );
};

export default memo(LoginForm);

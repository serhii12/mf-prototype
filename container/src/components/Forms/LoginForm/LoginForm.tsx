import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import { FormElements } from '@gourban/ui-components';

interface LoginFormInterface {
  onSubmit: Function;
}

interface Values {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormInterface> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors: any = {};
        if (values?.username?.length > 25) {
          errors.username = 'Sorry.';
        }

        return errors;
      }}
      onSubmit={(values: Values) => {
        onSubmit(values);
      }}
    >
      <Form>
        <FormElements.Columns>
          <FormElements.Column>
            <FormElements.Text
              name="username"
              fieldAttr={{ id: 'username', placeholder: 'Enter username...' }}
              fieldProps={{ label: 'Username' }}
            />
          </FormElements.Column>

          <FormElements.Column>
            <FormElements.Password
              name="password"
              fieldAttr={{ id: 'password', placeholder: 'Enter password...' }}
              fieldProps={{ label: 'Password' }}
            />
          </FormElements.Column>
        </FormElements.Columns>

        <button data-cypress-id="login" type="submit">
          Test
        </button>
      </Form>
    </Formik>
  );
};

export default memo(LoginForm);

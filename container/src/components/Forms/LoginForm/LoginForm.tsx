import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import { FormElements } from '@gourban/ui-components';
import { useNavigate } from 'react-router-dom';

interface LoginFormInterface {
  onSubmit: Function;
}

interface Values {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormInterface> = ({ onSubmit }) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={(values) => {
        const errors: any = {};
        if (values?.email?.length > 25) {
          errors.username = 'Sorry.';
        }

        return errors;
      }}
      onSubmit={async (values: Values) => {
        try {
          await onSubmit(values);

          navigate('/analytics');
        } catch (e) {
          console.error(e.message);
        }
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <FormElements.Columns>
              <FormElements.Column>
                <FormElements.Text
                  name="email"
                  fieldAttr={{ id: 'email', placeholder: 'Enter email...' }}
                  fieldProps={{ label: 'Email' }}
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
              {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default memo(LoginForm);

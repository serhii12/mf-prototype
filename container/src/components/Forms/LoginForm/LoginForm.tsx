import React, { FormEvent, memo } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form } from '@core/components/FormElements';
import { Text, Password } from '@core/components/FormElements';

interface LoginFormInterface {
  onSubmit: React.FormEventHandler<FormEvent>;
}

const LoginForm: React.FC<LoginFormInterface> = ({ onSubmit }) => {
  return (
    <FinalForm onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Form id="login_form" onSubmit={handleSubmit}>
          <Form.Row>
            <Field
              name="username"
              fieldProps={{ label: 'Username' }}
              fieldAttr={{ id: 'username' }}
              component={Text}
            />
          </Form.Row>

          <Form.Row>
            <Field
              name="password"
              fieldProps={{ label: 'Password' }}
              fieldAttr={{ id: 'password' }}
              component={Password}
            />
          </Form.Row>

          <button>Ok</button>
        </Form>
      )}
    </FinalForm>
  );
};

export default memo(LoginForm);

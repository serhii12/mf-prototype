import React from 'react';
import { FormElements } from '@gourban/ui-components';
import { Form, Formik } from 'formik';
import './index.scss';

export default {
  title: 'UI Components/Form elements',
  component: FormElements.Password
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Password Form element</h1>
        <p className="font-body-m">This is used for inputs that require passwords </p>
      </header>

      <Formik
        validate={() => {
          const errors = {
            password: undefined
          };

          if (args.triggerError) {
            errors.password = 'You triggered some error';
          } else {
            errors.password = undefined;
          }

          return errors;
        }}
        onSubmit={() => {}}
        initialValues={{ password: '' }}
      >
        <Form>
          <FormElements.Password
            name="password"
            fieldAttr={{
              id: 'password',
              disabled: args.fieldAttr.disabled,
              required: args.fieldAttr.required,
              placeholder: args.fieldAttr.placeholder
            }}
            fieldProps={{ label: args.fieldProps.label }}
          />
        </Form>
      </Formik>
    </>
  );
};

export const Password = Template.bind({});
Password.args = {
  name: 'password',
  fieldAttr: {
    id: 'password',
    disabled: false,
    required: false,
    placeholder: 'Enter password'
  },
  fieldProps: {
    label: 'Password'
  },
  triggerError: false
};

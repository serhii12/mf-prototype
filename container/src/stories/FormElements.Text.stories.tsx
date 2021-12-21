import React from 'react';
import { FormElements } from '@gourban/ui-components';
import { Form, Formik } from 'formik';
import './index.scss';

export default {
  title: 'UI Components/Form elements',
  component: FormElements.Text
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Text Form element</h1>
        <p className="font-body-m">This is used for inputs that require text only</p>
      </header>

      <Formik
        validate={() => {
          const errors = {
            username: undefined
          };

          if (args.triggerError) {
            errors.username = 'You triggered some error';
          } else {
            errors.username = undefined;
          }

          return errors;
        }}
        onSubmit={() => {}}
        initialValues={{ username: '' }}
      >
        <Form>
          <FormElements.Text
            name="username"
            fieldAttr={{
              id: 'username',
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

export const Text = Template.bind({});
Text.args = {
  name: 'username',
  fieldAttr: {
    id: 'username',
    disabled: false,
    required: false,
    placeholder: 'Enter something'
  },
  fieldProps: {
    label: 'Username'
  },
  triggerError: false
};

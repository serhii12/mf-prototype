import React from 'react';
import { FormElements } from '@gourban/ui-components';
import { Form, Formik } from 'formik';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import './index.scss';

export default {
  title: 'UI Components/Form elements',
  component: FormElements.Password
};

const codeSnippet = Prism.highlight(
  `<FormElements.Select
        name="password_component" // field name - required field
        fieldAttr={{
          id: 'password_component', // input id - binds to label - required field
          disabled: false, // true | false
          required: false // true | false
          placeholder: 'Enter something...' // input placeholder,
          className: 'some-extra-class' // extra css class if needed - string
        }}
        fieldProps={{
          label: 'Some label', // input label - require field
          clearable: true, // close icon ( button ) that clears the input value - true | false
        }}
  />`,
  Prism.languages.javascript,
  'javascript'
);

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Password Form element</h1>
        <p className="font-body-m">This is used for inputs that require passwords </p>
      </header>

      <Formik
        validate={() => {
          const errors: any = {};

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
              disabled: args.disabled,
              required: args.required,
              placeholder: args.placeholder
            }}
            fieldProps={{ label: args.label }}
          />
        </Form>
      </Formik>

      <br />

      <pre className="language-js">
        <code dangerouslySetInnerHTML={{ __html: codeSnippet }} />
      </pre>
    </>
  );
};

export const Password = Template.bind({});
// @ts-ignore
Password.args = {
  name: 'password',
  fieldAttr: {
    id: 'password'
  },
  placeholder: 'Enter password',
  required: true,
  disabled: false,
  label: 'Password',
  triggerError: false
};

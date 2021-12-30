import React from 'react';
import { FormElements } from '@gourban/ui-components';
import { Form, Formik } from 'formik';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import './index.scss';

export default {
  title: 'UI Components/Form elements',
  component: FormElements.Select
};

const codeSnippet = Prism.highlight(
  `<FormElements.Select
        name="select_component" // field name - required field
        fieldAttr={{
          id: 'select_component', // input id - binds to label - required field
          disabled: false, // true | false
          required: false // true | false
          placeholder: 'Enter something...' // input placeholder,
          className: 'some-extra-class' // extra css class if needed - string
        }}
        fieldProps={{
          label: 'Some label', // input label - require field
          options: [{ value: 'value', label: 'Some label' }], // Array of value/label pairs
          clearable: true, // close icon ( button ) that removes all selected items - true | false
          isMulti: false, // Is select component multiselect or not, true | false
        }}
  />`,
  Prism.languages.javascript,
  'javascript'
);

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Select Form element</h1>
        <p className="font-body-m">This is used for inputs that require text only</p>
      </header>

      <Formik
        onSubmit={() => {}}
        validate={() => {
          const errors: any = {};

          if (args.triggerError) {
            errors.select_component = 'You triggered some error';
          } else {
            errors.select_component = undefined;
          }

          return errors;
        }}
        initialValues={{ select_component: '' }}
      >
        <Form>
          <FormElements.Select
            name="select_component"
            fieldAttr={{
              id: 'select_component',
              disabled: args.disabled,
              placeholder: args.placeholder,
              required: args.required
            }}
            fieldProps={{
              label: args.label,
              options: args.fieldProps.options,
              clearable: args.clearable,
              isMulti: args.multiple
            }}
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

export const Select = Template.bind({});
// @ts-ignore
Select.args = {
  label: 'Normal select component',
  fieldProps: {
    options: [
      { label: 'This is label #1', value: 'label_1' },
      { label: 'This is label #2', value: 'label_2' }
    ]
  },
  placeholder: 'Some place holder...',
  disabled: false,
  clearable: true,
  triggerError: false,
  multiple: false,
  required: false
};

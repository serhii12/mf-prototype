import React from 'react';
import { FormElements } from '@gourban/ui-components';
import { Form, Formik } from 'formik';
import Prism from 'prismjs';
import axios from 'axios';
import 'prismjs/themes/prism-twilight.css';
import './index.scss';

export default {
  title: 'UI Components/Form elements',
  component: FormElements.Select,
  argTypes: {
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'radio' }
    }
  }
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
          options: {
              getData: (inputValue) => axios.get('URL'), // function that will be called to get the data from
              mapData: {
                  label: 'label_key', // which key from retrieved data will be used as label ( this can be customized with curly brackets if multiple is needed. EX: {first_name} {last_name} )
                  value: 'value_key' // which key from retrieved data will be used as value ( this will probably be ID or something like that )
              }
          }, // Object containing autocomplete needed data
          clearable: true, // close icon ( button ) that removes all selected items - true | false
          isMulti: false, // Is select component multiselect or not, true | false,
          prefix: '$', // prefix displayed before input element
          suffix: '$', // suffix displayed after input element
          icon: 'approve' // icon name, name must be one of icons from style guide
          iconPosition: 'right' // position of the icon, left or right
        }}
  />`,
  Prism.languages.javascript,
  'javascript'
);

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Autocomplete Form element</h1>
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
              options: {
                getData: (inputValue: string) =>
                  axios.get(`https://jsonplaceholder.typicode.com/todos?search=${inputValue}`),
                mapData: {
                  value: 'id',
                  label: '{title} {id}'
                }
              },
              clearable: args.clearable,
              isMulti: args.multiple,
              prefix: args.prefix,
              suffix: args.suffix,
              icon: args.icon,
              iconPosition: args.iconPosition
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

export const Autocomplete = Template.bind({});
// @ts-ignore
Autocomplete.args = {
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
  prefix: '',
  suffix: '',
  icon: '',
  iconPosition: 'right',
  multiple: false,
  required: false
};

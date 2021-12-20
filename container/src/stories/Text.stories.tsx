import React from 'react';
import { Form as FormWrapper, Text as TextElement } from '../components/FormElements';
import { Field, Form as FinalForm } from 'react-final-form';

export default {
  title: 'UI Components/Form Elements',
  component: TextElement
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Text</h1>
        <br />

        <FinalForm onSubmit={() => {}}>
          {({}) => (
            <FormWrapper.Row>
              <Field
                name="second"
                fieldAttr={{
                  id: args.fieldAttr.id,
                  placeholder: args.fieldAttr.placeholder,
                  disabled: args.fieldAttr.disabled
                }}
                fieldProps={{ label: args.fieldProps.label }}
                component={TextElement}
              />
            </FormWrapper.Row>
          )}
        </FinalForm>
      </header>
    </>
  );
};

export const Text = Template.bind({});
Text.args = {
  fieldAttr: {
    id: 'some ID',
    placeholder: 'Type something...',
    disabled: false
  },
  fieldProps: {
    label: 'Some label'
  }
};
Text.parameters = {};

import React from 'react';
import { Form as FormWrapper, Password as PasswordElement } from '../components/FormElements';
import { Field, Form as FinalForm } from 'react-final-form';

export default {
  title: 'UI Components/Form Elements',
  component: PasswordElement
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Password</h1>
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
                component={PasswordElement}
              />
            </FormWrapper.Row>
          )}
        </FinalForm>
      </header>
    </>
  );
};

export const Password = Template.bind({});
Password.args = {
  fieldAttr: {
    id: 'some ID',
    placeholder: 'Type something...',
    disabled: false
  },
  fieldProps: {
    label: 'Some label'
  }
};
Password.parameters = {};

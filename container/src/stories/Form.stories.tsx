import React from 'react';
import { Form as FormWrapper, Text } from '../components/FormElements';
import { Field, Form as FinalForm } from 'react-final-form';

export default {
  title: 'UI Components/Form Elements',
  component: FormWrapper
};

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Form</h1>
        <p className="font-body-m">
          Form component is used to wrap your form. ID and onSubmit callback are required
        </p>
        <br />

        <h3>Form.Row</h3>
        <p className="font-body-m">
          Creates form row that wraps child elements into a flex box with default margin separators.
          Each form element should be wrapped inside this element to maintain spacing consistency
        </p>
        <p className="font-body-m">
          Example:{' '}
          <code>
            {`<Form.Row>
              <Field name="text" fieldAttr={{ placeholder: 'Some input...' }} component={Text} />
            </Form.Row>`}
          </code>
        </p>
        <FinalForm onSubmit={() => {}}>
          {({}) => (
            <FormWrapper.Row>
              <Field name="text" fieldAttr={{ placeholder: 'Some input...' }} component={Text} />
            </FormWrapper.Row>
          )}
        </FinalForm>

        <br />

        <h3>Form.Columns</h3>
        <p className="font-body-m">
          Wraps elements into flex box with row direction. Each element inside columns should be
          wrapper into Form.Column element
        </p>
        <p className="font-body-m">
          Example:{' '}
          <code>
            {`<Form.Columns>
                <Form.Column>
                        <Field name="text" fieldAttr={{ placeholder: 'Some input...' }} component={Text} />
                  </Form.Column>
              </Form.Columns>`}
          </code>
        </p>
        <FinalForm onSubmit={() => {}}>
          {({}) => (
            <FormWrapper.Columns>
              <FormWrapper.Column>
                <Field
                  name="first"
                  fieldAttr={{ placeholder: 'Some input....' }}
                  component={Text}
                />
              </FormWrapper.Column>{' '}
              <FormWrapper.Column>
                <Field
                  name="second"
                  fieldAttr={{ placeholder: 'Some input...' }}
                  component={Text}
                />
              </FormWrapper.Column>
            </FormWrapper.Columns>
          )}
        </FinalForm>
      </header>
    </>
  );
};

export const Form = Template.bind({});
Form.args = {
  id: '',
  className: '',
  onSubmit: () => {}
};
Form.parameters = {};

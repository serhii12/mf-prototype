import React from 'react';
import { Modal as ModalComponent } from '@gourban/ui-components';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';

export default {
  title: 'UI Components/Modal',
  component: ModalComponent,
  argType: {
    variation: {
      options: ['default', 'small', 'large'],
      control: { type: 'radio' }
    },
    opened: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    className: {
      table: {
        disabled: true
      }
    }
  }
};

const codeSnippet = Prism.highlight(
  `<Modal 
        className="some-class" // Additional class name if needed
        variation="default" // Variation of modal. This can be default|small|large   
        opened  // Handles weather Modal should be opened or not, true/false boolean
        onClose={() => {}} // callback function that triggers when close request is sent ( this could be outside modal click or close click )
   > 
        <h1>This is some modal content</h1> 
    </Modal>`,
  Prism.languages.javascript,
  'javascript'
);

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Modal</h1>
        <p className="font-body-m">Interact with the modal in the controls tab</p>
      </header>
      <ModalComponent {...args}>This is modal content</ModalComponent>

      <br />

      <pre className="language-js">
        <code dangerouslySetInnerHTML={{ __html: codeSnippet }} />
      </pre>
    </>
  );
};

export const Modal = Template.bind({});
// @ts-ignore
Modal.args = {
  opened: false,
  variation: 'default',
  className: ''
};

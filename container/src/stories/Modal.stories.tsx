import React from 'react';
import { Modal as ModalComponent } from '@gourban/ui-components';
import './index.scss';

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

const Template = (args) => {
  return (
    <>
      <header className="story-header">
        <h1 className="story-header__title">Modal</h1>
        <p className="font-body-m">Interact with the modal in the controls tab</p>
      </header>
      <ModalComponent {...args}>This is modal content</ModalComponent>
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {
  opened: false,
  variation: 'default',
  className: ''
};
Modal.parameters = {
  className: { table: { disable: true } }
};

import React from 'react';
import { FormElementProps } from '@ts/types/formElements.types';
import styles from './Input.module.scss';

const Input: React.FC<FormElementProps> = ({ input, fieldProps, children }) => {
  return (
    <div className={`${styles.input}`}>
      {children}

      {fieldProps?.label && (
        <label htmlFor={input.name} className={`${styles.input__label}`}>
          {fieldProps?.label}
        </label>
      )}
    </div>
  );
};

export default Input;

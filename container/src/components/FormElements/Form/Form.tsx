import React from 'react';
import styles from './Form.module.scss';
import { FormProps } from '@ts/types/formElements.types';

/**
 * Form Component
 */
const Form = ({ id, children, onSubmit, className }: FormProps) => {
  return (
    <form id={id} onSubmit={onSubmit} className={`${styles.form} ${className || ''}`}>
      {children}
    </form>
  );
};

/**
 * Form Columns Component
 * Used to separate its children into flex box
 */
const Columns: React.FC = ({ children }) => {
  return <div className={`${styles.form__columns}`}>{children}</div>;
};

/**
 * Form Column Component
 * Adds flex item
 */
const Column: React.FC = ({ children }) => {
  return <div className={styles.form__column}>{children}</div>;
};

/**
 * Form Row Component
 * Used as a wrapper around element
 */
const Row: React.FC = ({ children }) => {
  return <div className={`${styles.form__row}`}>{children}</div>;
};

Form.Row = Row;
Form.Columns = Columns;
Form.Column = Column;

export default Form;

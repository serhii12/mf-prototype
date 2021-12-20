import React from 'react';
import Input from '../Input';
import { FormElementProps } from '@ts/types/formElements.types';
import styles from '@core/components/FormElements/Input/Input.module.scss';

const Text: React.FC<FormElementProps> = ({ meta, input, fieldAttr, fieldProps }) => {
  return (
    <Input fieldProps={fieldProps} meta={meta} fieldAttr={fieldAttr} input={input}>
      <input {...input} {...fieldAttr} type="text" className={styles.input__field} />
    </Input>
  );
};

export default Text;

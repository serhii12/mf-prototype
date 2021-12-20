import React, { useState } from 'react';
import Input from '../Input';
import { FormElementProps } from '@ts/types/formElements.types';
import styles from '@core/components/FormElements/Input/Input.module.scss';
import Svg from '@core/components/Svg';

const Password: React.FC<FormElementProps> = ({ meta, input, fieldAttr, fieldProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Input fieldProps={fieldProps} meta={meta} fieldAttr={fieldAttr} input={input}>
      <input
        {...input}
        {...fieldAttr}
        type={passwordVisible ? 'text' : 'password'}
        className={styles.input__field}
      />
      <button
        className={styles.input__action}
        onClick={(e) => {
          e.preventDefault();
          setPasswordVisible(!passwordVisible);
        }}
      >
        <Svg icon={passwordVisible ? 'passHide' : 'passShow'} />
      </button>
    </Input>
  );
};

export default Password;

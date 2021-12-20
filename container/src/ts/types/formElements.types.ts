import React from 'react';
import { FieldRenderProps } from 'react-final-form';

export interface FormElementFieldProps {
  label: string;
}

export interface FormElementFieldAttr {
  id: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface FormElementProps extends FieldRenderProps<string> {
  fieldAttr: FormElementFieldAttr;
  fieldProps: FormElementFieldProps;
}

export interface FormProps {
  id: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  children: any;
}

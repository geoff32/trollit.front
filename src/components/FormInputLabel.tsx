import React from "react";
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import { Input, InputProps } from './Input';
import styles from './FormInputLabel.module.scss';

interface FormInputLabelProps extends Omit<InputProps, "valid" | "invalid"> {
  label: string;
  error?: string;
}

export const FormInputLabel: React.FC<FormInputLabelProps> =
  React.forwardRef<InputProps, FormInputLabelProps>((props, ref) => {
    const { id, placeholder, label, error, ...inputProps } = props;
    
    return (
      <FormGroup floating>
        <Input ref={ref} id={id} placeholder={placeholder || label} {...inputProps} valid={!error} invalid={!!error} />
        <Label className={styles["input-label"]} for={id}>{label}</Label>
        {!!error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    )
  })
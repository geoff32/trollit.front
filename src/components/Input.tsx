import React from 'react';
import { Input as InputStrap, InputProps as InputStrapProps } from 'reactstrap';
import styles from './Input.module.scss';

export interface InputProps extends InputStrapProps {
}

export const Input: React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <InputStrap innerRef={ref} className={styles.input} {...props} />
})
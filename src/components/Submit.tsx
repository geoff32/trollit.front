import React from "react";
import { Input as InputStrap, InputProps as InputStrapProps } from 'reactstrap';
import styles from './Submit.module.scss';

interface SubmitProps extends Omit<InputStrapProps, "type"> {
}

export function Submit(props: SubmitProps) {
  return <InputStrap type="submit" className={styles.submit} {...props} />
}
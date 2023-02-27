import React from "react";
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input : React.FC<InputProps> = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input className={styles.input} ref={ref} {...props} />
})

export default Input;
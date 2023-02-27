import React from "react";
import styles from './Submit.module.scss';

interface SubmitProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
}

const Submit : React.FC<SubmitProps> = React.forwardRef<HTMLInputElement, SubmitProps>((props, ref) => {
  return <input type="submit" className={styles.submit} ref={ref} {...props} />
})

export default Submit;
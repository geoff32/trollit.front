import { Button as ButtonStrap, ButtonProps as ButtonStrapProps } from 'reactstrap';
import { Loading } from './Loading';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonStrapProps {
  loading?: boolean;
}

export function Button({loading, disabled, children, ...props}: ButtonProps) {
  return (
    <ButtonStrap disabled={disabled || loading} {...props}>
      {children}
      {loading && <Loading size="sm">Loading...</Loading>}
    </ButtonStrap>
  )
}

export function SubmitButton({loading, disabled, children, className, ...props}: ButtonProps) {
  return (
    <ButtonStrap className={`${styles.submit} ${className}`} disabled={disabled || loading} {...props}>
      {children}
      {loading && <Loading size="sm">Loading...</Loading>}
    </ButtonStrap>
  )
}
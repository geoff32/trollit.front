import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';


interface LinkProps extends RouterLinkProps {
  disabled?: boolean;
}

export function Link({disabled, ...props}: LinkProps) {
  if (disabled) {
    const { className, children } = props;
    
    return <span className={className}>{children}</span>
  }

  return <RouterLink {...props} />
}
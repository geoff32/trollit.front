import { Spinner, SpinnerProps } from 'reactstrap';

interface LoadingProps extends SpinnerProps {
}

export function Loading(props: LoadingProps) {
  return <Spinner {...props} />
}
import { Container as ContainerStrap, ContainerProps as ContainerStrapProps } from 'reactstrap';

interface ContainerProps extends ContainerStrapProps {

}

export function Container(props: ContainerProps) {
  return <ContainerStrap {...props} />
}
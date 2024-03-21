import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Container } from './Container';
import ErrorContainer from '../errors/components/ErrorContainer';
import AxiosErrorDispatcher from '../errors/components/AxiosErrorDispatcher';

export function Layout({ children }: Readonly<{ children?: React.ReactNode }>) {
  return (
    <Container>
      <NavBar />
      <Container className="text-center">
        <AxiosErrorDispatcher />
        <ErrorContainer />
        {children}
        <Outlet />
      </Container>
    </Container>
  )
}
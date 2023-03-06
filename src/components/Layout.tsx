import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Container } from './Container';

export function Layout({ children }: { children?: React.ReactNode }) {  
  return (
    <Container fluid>
      <NavBar />
      <Container fluid className="text-center">
        {children}
        <Outlet />
      </Container>
    </Container>
  )
}
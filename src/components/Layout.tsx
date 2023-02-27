import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUserStatus } from '../features/authentication/authenticationSlice';

export function Layout({ children }: { children?: React.ReactNode }) {
  const status = useAppSelector(selectUserStatus);
  
  return (
    <div>
      <Link to="/">Accueil</Link>
      {status === "not authenticated" && <Link to="/signin">Connexion</Link>}
      {status === "authenticated" && <Link to="/signout">Déconnexion</Link>}
      {children}
      <Outlet />
    </div>
  )
}
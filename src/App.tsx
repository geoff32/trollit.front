import { SignIn } from './features/authentication/SignIn';
import { Home } from './features/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { SignOut } from './features/authentication/SignOut';
import { Container, Layout } from './components';
import './themes.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ValidateUser } from './features/authentication/components/ValidateUser';
import { AccountCreation } from './features/account/AccountCreation';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{
        element: <Home />,
        index: true
      }, {
        path: "signin",
        element: <SignIn />,
      }, {
        path: "signout",
        element: <SignOut />,
      }, {
        path: "account",
        children: [{
          path: "create",
          element: <AccountCreation />
        }]
      }]
    }
  ]);

  return (
    <Container fluid>
      <ValidateUser />
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;

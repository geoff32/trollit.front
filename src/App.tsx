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
      }]
    }
  ]);

  return (
    <Container fluid>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;

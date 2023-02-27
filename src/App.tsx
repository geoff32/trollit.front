import './App.css';
import { SignIn } from './features/authentication/SignIn';
import { Home } from './features/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './themes.scss';
import { Layout } from './components';
import { SignOut } from './features/authentication/SignOut';

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
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
  );
}

export default App;

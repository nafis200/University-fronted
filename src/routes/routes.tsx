import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import { adminPaths } from "./admin.routes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <App/>,
    children: adminPaths
  },
  {
    path: "/Faculty",
    element: <App/>,
    children: adminPaths
  },
  {
    path: "/Student",
    element: <App/>,
    children: adminPaths
  },
]);

export default router;

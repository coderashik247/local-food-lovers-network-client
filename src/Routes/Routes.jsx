import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        path: "login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element: <Register></Register>
      }
    ],
  },
]);

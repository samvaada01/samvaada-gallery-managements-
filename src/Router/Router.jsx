import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Login/Login";
import Register from "../components/pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/pages/ErrorPage";
import AddEvent from "../components/pages/Admin/AddEvent";
import UpdateEvent from "../components/pages/Admin/UpdateEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("/events-data.json"),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin/add-event",
        element: <PrivateRoute><AddEvent /></PrivateRoute>,
      },
      {
        path: "/admin/update-event/:id",
        element: <PrivateRoute><UpdateEvent /></PrivateRoute>,
      },
    ],
  },
]);

export default router;
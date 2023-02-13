import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Detail from "./Routes/Detail";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":id",
        element: <Detail />,
      },
    ],
  },
]);

export default router;

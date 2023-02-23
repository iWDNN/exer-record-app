import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ExerLogs from "./Routes/ExerLogs";
import PlayExer from "./Routes/PlayExer";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "play/:exerId",
        element: <PlayExer />,
      },
      {
        path: "logs",
        element: <ExerLogs />,
      },
    ],
  },
]);
export default router;

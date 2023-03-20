import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ExerLogs from "./Routes/ExerLogs";
import PlayExer from "./Routes/PlayExer";
import ExerList from "./Routes/ExerList";
import ExerLabs from "./Routes/ExerLabs";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ExerList />,
      },
      {
        path: "play",
        element: <PlayExer />,
      },
      {
        path: "logs",
        element: <ExerLogs />,
      },
      {
        path: "labs",
        element: <ExerLabs />,
      },
    ],
  },
]);
export default router;

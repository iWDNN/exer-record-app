import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ExerLogs from "./Routes/ExerLogs";
import PlayExer from "./Routes/PlayExer";
import ExerList from "./Routes/ExerList";
import ExerLabs from "./Routes/ExerLabs";
import LabDetail from "./Routes/LabDetail";

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
        path: "play/:exerId",
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
      {
        path: "labs/:exerId",
        element: <LabDetail />,
      },
    ],
  },
]);
export default router;

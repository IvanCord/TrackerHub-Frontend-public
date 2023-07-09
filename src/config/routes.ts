import Orders from "../components/Tables/DetailTable";
import Simulator from "../pages/Simulator";
import Error404 from "../pages/Error404";

const routes = [
  // General
  {
    path: "/",
    exact: true,
    component: Simulator,
  },
  //Error 404
  {
    path: "*",
    exact: false,
    component: Error404,
  },
];

export default routes;

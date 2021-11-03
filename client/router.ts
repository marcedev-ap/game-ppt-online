import { Router } from "@vaadin/router";

const rootEl = document.querySelector(".root");
const router = new Router(rootEl);
router.setRoutes([
  { path: "/", component: "x-welcome-page" },
  { path: "/signup", component: "x-signup-page" },
  { path: "/sharecode", component: "x-sharecode-page" },
  // { path: "/waitroom", component: "x-waitroom-page" },
]);

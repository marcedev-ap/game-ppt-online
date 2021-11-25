import { Router } from "@vaadin/router";

const rootEl = document.querySelector(".root");
const router = new Router(rootEl);
router.setRoutes([
  { path: "/", component: "x-welcome-page" },
  { path: "/welcome", component: "x-welcome-page" },
  { path: "/signup", component: "x-signup-page" },
  { path: "/sharecode", component: "x-sharecode-page" },
  { path: "/accessroom", component: "x-accessroom-page" },
  { path: "/gamerules", component: "x-rules-page" },
  { path: "/accesserror", component: "x-accesserror-page" },
  { path: "/guesserror", component: "x-guesserror-page" },
  { path: "/errorgame", component: "x-errorgame-page" },
  { path: "/waitroom", component: "x-waitroom-page" },
  { path: "/game", component: "x-game-page" },
  { path: "/play", component: "x-play-page" },
  { path: "/result", component: "x-result-page" },
]);

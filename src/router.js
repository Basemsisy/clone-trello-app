import Vue from "vue";
import Router from "vue-router";
import Board from "./views/Board.vue";
import Task from "./views/Task.vue";
import CreateBoard from "./views/CreateBoard.vue";
import Boards from "./views/Boards.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/boards", name: "boards", component: Boards },
    {
      path: "/create",
      name: "create",
      component: CreateBoard,

      meta: { requiersBoard: false }
    },
    {
      path: "/",
      name: "board",
      component: Board,
      meta: { requiersBoard: true },
      children: [
        {
          path: "task/:id",
          name: "task",
          component: Task
        }
      ]
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {
  let board = localStorage.getItem("board");
  if (to.matched.some(record => record.meta.requiersBoard) && !board) {
    next("/create");
  } else {
    next();
  }
  if (to.matched.some(record => !record.meta.requiersBoard) && board) {
    next("/");
  } else {
    next();
  }
});

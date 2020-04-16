import Vue from "vue";
import Router from "vue-router";
import Board from "./views/Board.vue";
import Task from "./views/Task.vue";
import CreateBoard from "./views/CreateBoard.vue";
import Boards from "./views/Boards.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/boards", name: "boards", component: Boards },
    { path: "/create", name: "create", component: CreateBoard },
    {
      path: "/",
      name: "board",
      component: Board,
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

/*eslint-disable*/
import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "./default-board";
import { saveStatePlugin, uuid } from "./utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board"));
const boards = defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
    boards
  },
  getters: {
    getTask(state) {
      return id => {
        for (let column of state.board.columns) {
          for (let task of column.tasks) {
            if (task.id == id) {
              return task;
            }
          }
        }
      };
    }
  },
  mutations: {
    CREATE_BOARD(state, { name }) {
      state.board = { name: name, columns: [], boardColor: "#0fb9b1" };
    },
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({ name, id: uuid(), description: "" });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      let task = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskIndex, 0, task);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      let columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
    CHANGE_BOARD_COLOR(state, { newColor }) {
      state.board.boardColor = newColor;
    }
  }
});

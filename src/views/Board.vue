<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        @drop="dropTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        draggable
        @dragstart.self="dragColumn($event, $columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goTask(task)"
            draggable
            @dragstart="dragATask($event, $taskIndex, $columnIndex)"
          >
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p
              v-if="task.description"
              class="w-full flex-no-shrink mt-1 font-small"
            >{{ task.description }}</p>
          </div>
          <input
            type="text"
            class="block w-full p-2 bg-transparent"
            placeholder="+ enter a new task"
            @keyup.enter="addTask($event, column.tasks)"
          />
        </div>
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="goBack">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name == "task";
    }
  },
  methods: {
    goTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    goBack() {
      this.$router.push({ name: "board" });
    },
    addTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    },
    dragATask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.fropEffect = "move";

      e.dataTransfer.setData("task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "task");
    },
    dragColumn(e, fromColumnIndex) {
      console.log(e);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.fropEffect = "move";

      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    },
    dropTaskOrColumn(e, tasks, toColumnIndex) {
      const type = e.dataTransfer.getData("type");
      if (type == "task") {
        this.dropATask(e, tasks);
      } else {
        this.dropAColumn(e, toColumnIndex);
      }
    },
    dropATask(e, toTasks) {
      let fromColumnIndex = e.dataTransfer.getData("from-column-index");
      let taskIndex = e.dataTransfer.getData("task-index");
      let fromTasks = this.board.columns[fromColumnIndex].tasks;
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        toTasks,
        taskIndex
      });
    },
    dropAColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      console.log(fromColumnIndex);
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  }
};
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>

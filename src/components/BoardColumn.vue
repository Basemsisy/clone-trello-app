<template>
  <div
    class="column"
    @drop="dropTaskOrColumn($event, column.tasks, columnIndex)"
    @dragstart.self="dragColumn($event, columnIndex)"
    draggable
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :columnIndex="columnIndex"
        :column="column"
        :board="board"
      />
      <input
        type="text"
        class="block w-full p-2 bg-transparent"
        placeholder="+ enter a new task"
        @keyup.enter="addTask($event, column.tasks)"
      />
    </div>
  </div>
</template>
<script>
import ColumnTask from "./ColumnTask";
import dragAndDropMixin from "../mixins/dragAndDropMixin";
export default {
  mixins: [dragAndDropMixin],
  components: {
    ColumnTask
  },

  methods: {
    // this function add new task
    addTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value
      });
      e.target.value = "";
    },

    // drag column
    dragColumn(e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.fropEffect = "move";

      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
    }
  }
};
</script>
<style >
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
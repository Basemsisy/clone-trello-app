<template>
  <div
    class="task"
    @click="goTask(task)"
    @dragstart="dragATask($event, taskIndex, columnIndex)"
    @drop.stop="dropTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
    draggable
    @dragover.prevent
    @dragenter.prevent
  >
    <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
    <p v-if="task.description" class="w-full flex-no-shrink mt-1 font-small">{{ task.description }}</p>
  </div>
</template>

<script>
import dragAndDropMixin from "../mixins/dragAndDropMixin";
export default {
  mixins: [dragAndDropMixin],
  props: {
    task: {
      type: Object
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    // this function open task in modal when click on task
    goTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    }, // drag task
    dragATask(e, taskIndex, fromColumnIndex) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.fropEffect = "move";

      e.dataTransfer.setData("from-task-index", taskIndex);
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "task");
    }
  }
};
</script>
<style >
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
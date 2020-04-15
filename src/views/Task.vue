<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <!-- {{ task.name }} -->
      <input
        class="p-2 w-full mr-2 block text-xl font-bold"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
      />
      <textarea
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        class="relative w-full bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value
      });
    }
  }
};
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>

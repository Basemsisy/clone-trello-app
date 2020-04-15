<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="new column name"
          v-model="newColumnName"
          @keyup.enter="createNewColumn"
        />
      </div>
    </div>
    <div class="task-bg" v-if="isTaskOpen" @click.self="goBack">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BoardColumn from "../components/BoardColumn";
/*eslint-disable*/
import { mapState } from "vuex";
export default {
  components: { BoardColumn },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name == "task";
    }
  },
  methods: {
    // this function close the task
    goBack() {
      this.$router.push({ name: "board" });
    },
    // create new column
    createNewColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName
      });
      this.newColumnName = "";
    }
  },
  data() {
    return {
      newColumnName: ""
    };
  }
};
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
</style>

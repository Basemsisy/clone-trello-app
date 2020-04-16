<template>
  <div class="board" :style="{backgroundColor: board.boardColor }">
    <ul class="colors">
      <li
        v-for="color in colors"
        :key="color"
        @click="changeBoardColor(color)"
        :style="{backgroundColor: color, borderWidth: color == board.boardColor? '3px': '1px'}"
      ></li>
    </ul>
    <div>
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
  </div>
</template>

<script>
import BoardColumn from "../components/BoardColumn";
import boardColors from "../boardColors";
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
  created() {
    if (!this.board) {
      this.$router.push("/create");
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
    },
    changeBoardColor(color) {
      this.$store.commit("CHANGE_BOARD_COLOR", { newColor: color });
    }
  },
  data() {
    return {
      newColumnName: "",
      colors: boardColors
    };
  }
};
</script>

<style lang="css">
.board {
  @apply p-4  h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0, 0, 0, 0.5);
}
.colors {
  display: flex;
  justify-content: center;
}
.colors li {
  display: inline-block;
  margin: 20px;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  /* border: 1px solid snow; */
}
</style>

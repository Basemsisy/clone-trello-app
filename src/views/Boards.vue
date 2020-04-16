<template>
  <div class="boards-container flex flex-row items-start">
    <!-- {{boards}} -->
    <div
      class="max-w-sm rounded overflow-hidden shadow-lg"
      v-for="board in boards"
      :key="board.name"
    >
      <!-- <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> -->
      <div class="px-6 py-4">
        <router-link to="/">
          <div class="font-bold text-xl mb-2">{{board.name}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["boards"])
  }
};
</script>

<style lang="css">
.boards-container {
  @apply p-4 bg-teal-dark;
  display: grid;
  padding: 2%;
  height: 100vh;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 2%;
}
</style>
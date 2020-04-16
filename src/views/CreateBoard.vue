<template>
  <div class="board">
    <form @submit.prevent="createBoard" style="width: 50%; margin: auto; ">
      <input v-model="name" class="block w-full p-2" placeholder="enter your board name" />
      <Button type="submit" :disabled="!name">Create</Button>
    </form>
  </div>
</template>
<script>
import Button from "../components/AppButton";
export default {
  components: { Button },
  data() {
    return {
      name: ""
    };
  },
  methods: {
    createBoard() {
      this.$store.commit("CREATE_BOARD", { name: this.name });
      this.$router.push({ name: "board" });
    }
  }
};
</script>
<style scoped>
.board {
  height: 100vh;
  background-color: #d1d8e0;
  justify-content: center;
}
input {
  margin-bottom: 20px;
}
</style>
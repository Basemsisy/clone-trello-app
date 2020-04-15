export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    // drop task or column depend on type
    dropTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData("type");
      if (type == "task") {
        this.dropTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        );
      } else {
        this.dropAColumn(e, toColumnIndex);
      }
    },
    // drop task in new column or in the same column
    dropTask(e, toTasks, toTaskIndex) {
      let fromColumnIndex = e.dataTransfer.getData("from-column-index");
      let fromTaskIndex = e.dataTransfer.getData("from-task-index");
      let fromTasks = this.board.columns[fromColumnIndex].tasks;
      this.$store.commit("MOVE_TASK", {
        fromTasks,
        fromTaskIndex,
        toTasks,
        toTaskIndex
      });
    },
    // drop column
    dropAColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData("from-column-index");
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex
      });
    }
  }
};

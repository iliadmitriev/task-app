<template>
  <div>
    <div v-if="task">
      <h1>{{ task.title }}</h1>
    </div>
    <p v-else>Task not found</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Task",
  computed: {
    ...mapGetters(['taskById']),
    task() {
      return this.taskById(+this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
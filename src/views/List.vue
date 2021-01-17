<template>
  <div>
    <h1>List</h1>
    <div class="divider"></div>
    <table
        class="highlight"
        v-if="tasks.length"
    >
      <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Description</th>
        <th>Due date</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(task, i) in tasks"
          :key="task.id"
      >
        <td>{{ i + 1 }}</td>
        <td>
          <router-link
              tag="a"
              :to="'/task/' + task.id"
          >
            {{ task.title }}
          </router-link>
        </td>
        <td>
          <router-link
              tag="a"
              :to="'/task/' + task.id"
          >
            {{ task.description | truncate(50) }}
          </router-link>
        </td>
        <td class="nowrap">{{ task.dueDate | dateFormat }}</td>
        <td>{{ task.status }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>There is no tasks. You can create new one</p>
      <button
          class="btn"
          @click="$router.push('/')"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "List",
  computed: {
    ...mapGetters(['tasks'])
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}

</style>
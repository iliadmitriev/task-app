<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class="input-field col s6 m5 l4">
        <select
            id="filterByStatus"
            ref="filterStatus"
            v-model="filterByStatus"
        >
          <option value="" selected>All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="outdated">Outdated</option>
        </select>
        <label for="filterByStatus">Filter by status</label>
      </div>
    </div>
    <div class="divider"></div>
    <div

        class="highlight"
        v-if="displayTasks.length"
    >
      <table>
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
            v-for="(task, i) in displayTasks"
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
          <td
              class="nowrap"
              :class="{'deep-orange lighten-3': isDueDate(task) && !isCompleted(task)}"
          >
            {{ task.dueDate | dateFormat }}
          </td>
          <td
              :class="{'green lighten-3': isCompleted(task)}"
          >
            {{ task.status }}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="fixed-action-btn">
        <a
            class="btn-floating btn-large waves-effect waves-light"
            ref="floatingAdd"
            @click="$router.push('/create')"
        >
          <i class="material-icons">add</i>
        </a>
      </div>
    </div>
    <div v-else-if="!displayTasks.length && !filterByStatus">
      <p>There is no tasks to display.</p>
      <p>You can create new one.</p>
      <button
          class="btn-large"
          @click="$router.push('/create')"
      >
        <i class="material-icons right">arrow_forward</i>
        Create
      </button>
    </div>
    <div v-else-if="!displayTasks.length && filterByStatus">
      <p>There is no tasks to display.</p>
      <p>May be you have set a dense filter</p>
      <button
          class="btn-large red"
          @click="filterByStatus=''; $filterByStatus.input.value='All'"
      >
        <i class="material-icons right">close</i>
        clear filter
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "List",
  computed: {
    ...mapGetters(['tasks']),
    displayTasks() {
      if (!this.filterByStatus) {
        return this.tasks
      } else {
        return this.tasks.filter(t => {
          return (
              t.status === this.filterByStatus
              || (
                  this.filterByStatus === 'outdated'
                  && !this.isCompleted(t)
                  && this.isDueDate(t)
              ))
        })
      }
    }
  },
  data() {
    return {
      filterByStatus: '',
      $filterByStatus: null,
    }
  },
  mounted() {
    this.getAllTasks()

    if (this.tasks.length) {
      M.FloatingActionButton.init(this.$refs.floatingAdd, {})
    }
    this.$filterByStatus = M.FormSelect.init(this.$refs.filterStatus, {})
  },
  methods: {
    ...mapActions(['getAllTasks']),
    isDueDate(t) {
      return Date.parse(t.dueDate) < Date.now()
    },
    isCompleted(t) {
      return t.status === 'completed'
    },
    destroyed() {
      if (this.$filterByStatus && this.$filterByStatus.destroy) {
        this.$filterByStatus.destroy()
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
}

</style>
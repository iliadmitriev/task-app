<template>
  <div class="row">
    <div v-if="currentTask" class="col s12  m10  offset-l2 l8">
      <h1>{{ title }}</h1>
      <div class="divider"></div>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="title"
              type="text"
              class="validate"
              required
              v-model="title"
          >
          <label for="title">Title</label>
          <span class="helper-text" data-error="Task title is required">
          </span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
              id="description"
              class="materialize-textarea"
              ref="description"
              v-model="description"
          >
          </textarea>
          <label for="description">Description</label>
          <span class="character-counter symbol-counter">
            {{ description.length }}/2048
          </span>
        </div>
        <div class="input-field">
          <input
              id="dueDate"
              type="text"
              class="datepicker"
              ref="dueDate"
              v-model="dueDate"
          >
          <label for="dueDate">Due date</label>
        </div>
        <button
            type="submit"
            class="waves-effect waves-light btn-large col s5"
        >
          <i class="material-icons left">save</i>
          Save
        </button>
        <button
            type="button"
            class="waves-effect waves-light btn-large blue col s5 offset-s1"
            @click="completeHandler"
        >
          <i class="material-icons left">check</i>
          Complete
        </button>

      </form>


    </div>
    <p v-else>Task not found</p>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Task",
  data() {
    return {
      title: '',
      description: '',
      chips: null,
      dueDate: null
    }
  },
  computed: {
    ...mapGetters(['currentTask', 'currentId']),
  },
  async mounted() {
    await this.getTaskById(this.$route.params.id)

    this.title = this.currentTask.title
    this.description = this.currentTask.description

    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.currentTask.chips || ''
    })

    this.dueDate = M.Datepicker.init(this.$refs.dueDate, {
      autoClose: true,
      format: 'yyyy-mm-dd',
      defaultDate: new Date(this.currentTask.dueDate),
      setDefaultDate: true
    })

    setTimeout(() => {
      M.updateTextFields()
      M.textareaAutoResize(this.$refs.description)
    }, 0)

  },
  methods: {
    ...mapActions(['getTaskById', 'updateTask', 'completeTask']),
    submitHandler() {
      this.updateTask({
        title: this.title,
        description: this.description,
        chips: this.chips.chipsData,
        dueDate: this.dueDate.date
      })
      this.$router.push('/list')
    },
    completeHandler() {
      this.completeTask()
      this.$router.push('/list')
    }
  }
}
</script>

<style scoped>
.symbol-counter {
  float: right;
  font-size: 12px;
}

</style>
<template>
  <div class="row">
    <div v-if="task" class="col s12  m10  offset-l2 l8">
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
            class="btn waves-effect waves-light"
        >
          Save
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
    ...mapGetters(['taskById']),
    task() {
      return this.taskById(+this.$route.params.id)
    }
  },
  mounted() {

    this.title = this.task.title
    this.description = this.task.description

    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.chips
    })

    this.dueDate = M.Datepicker.init(this.$refs.dueDate, {
      autoClose: true,
      format: 'yyyy-mm-dd',
      defaultDate: new Date(this.task.dueDate),
      setDefaultDate: true
    })

    setTimeout(()=>{
      M.updateTextFields()
      M.textareaAutoResize(this.$refs.description)
    },0)

  },
  methods: {
    ...mapActions(['updateTask']),
    submitHandler() {
      this.updateTask({
        id: this.task.id,
        title: this.title,
        description: this.description,
        chips: this.chips.chipsData,
        dueDate: this.dueDate.date
      })
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
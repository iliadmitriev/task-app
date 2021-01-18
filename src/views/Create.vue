<template>
  <div class="row">
    <div class="col s12  m10  offset-l2 l8">
      <h1>Create</h1>
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
          <span class="helper-text" data-error="Task title is required" data-success="right"></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea
              id="description"
              class="materialize-textarea"
              v-model="description"
          >
          </textarea>
          <label for="description">Description</label>
          <span class="character-counter symbol-counter">{{ description.length }}/2048</span>
        </div>
        <div class="input-field">
          <input id="dueDate" type="text" class="datepicker" ref="dueDate">
          <label for="dueDate">Due date</label>
        </div>
        <button type="submit" class="btn-large waves-effect waves-light">
          <i class="material-icons left">save</i>
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Create',
  data() {
    return {
      title: '',
      description: '',
      chips: null,
      dueDate: null
    }
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags'
    })
    this.dueDate = M.Datepicker.init(this.$refs.dueDate, {
      autoClose: true,
      format: 'yyyy-mm-dd'
    })
  },
  methods: {
    ...mapActions(['createTask']),
    submitHandler() {
      const task = {
        // TODO: refactor id
        id: Date.now(),
        title: this.title,
        description: this.description,
        chips: this.chips.chipsData,
        dueDate: this.dueDate.date,
        status: 'active'
      }
      this.createTask(task)
      this.$router.push('/list')
    },
    destroyed() {
      if (this.dueDate && this.dueDate.destroy) {
        this.dueDate.destroy()
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy()
      }
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
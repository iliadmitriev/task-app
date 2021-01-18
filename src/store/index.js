import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
    },
    mutations: {
        addTask(state, task) {
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        saveTask(state, task) {
            const idx = state.tasks.findIndex(t => t.id === task.id)
            const oldTask = state.tasks[idx]
            state.tasks[idx] = {
                ...oldTask,
                ...task
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        createTask(ctx, task) {
            ctx.commit('addTask', task)
        },
        updateTask(ctx, task) {
            ctx.commit('saveTask', task)
        },
        completeTask(ctx, taskId) {
            ctx.commit('saveTask', {id: taskId, status: 'completed'})
        }
    },
    getters: {
        tasks: state => state.tasks,
        taskById: state => id => state.tasks.find(t => t.id === id)
    },
    modules: {}
})

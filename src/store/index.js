import Vue from 'vue'
import Vuex from 'vuex'
import {fetchAllTasks, fetchTaskById, patchTask, putTask} from '@/store/firebase'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        currentTask: null,
        currentId: null
    },
    mutations: {
        loadTasks(state, tasks) {
            state.tasks = tasks
        },
        addTask(state, {idx, task}) {
            state.tasks[idx] = task
        },
        saveTask(state, {idx, task}) {
            const oldTask = state.tasks[idx]
            state.tasks[idx] = {
                ...oldTask,
                ...task
            }
        },
        setCurrentTask(state, {task, id}) {
            state.currentTask = task
            state.currentId = id
        }
    },
    actions: {
        getAllTasks(ctx) {
            fetchAllTasks()
                .then((tasks) => ctx.commit('loadTasks', tasks || {}))
        },
        async getTaskById(ctx, id) {
             await fetchTaskById(id)
                .then(task => ctx.commit('setCurrentTask', {task, id}))
        },
        createTask(ctx, task) {
            putTask(task)
                .then(json => json.name)
                .then((id) => ctx.commit('addTask', {id, task}))
        },
        updateTask(ctx, task) {
            const idx = ctx.state.currentId
            patchTask(idx, task)
                .then(() => ctx.commit('saveTask', {idx, task}))
        },
        completeTask(ctx) {
            const idx = ctx.state.currentId
            const data = {
                status: 'completed'
            }
            patchTask(idx, data)
                .then(() => ctx.commit('saveTask', {idx, data}))
        }
    },
    getters: {
        tasks: state => Object.entries(state.tasks).map(el => ({id: el[0], ...el[1]})),
        currentTask: state => state.currentTask,
        currentId: state => state.currentId
    },
    modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'
import {fetchAllTasks, fetchTaskById, patchTask, postTask} from '@/store/firebase'


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
        addTask(state, {id, task}) {
            state.tasks[id] = task
        },
        saveTask(state, {id, task}) {
            const oldTask = state.tasks[id]
            state.tasks[id] = {
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
        async getAllTasks(ctx) {
            await fetchAllTasks()
                .then((tasks) => ctx.commit('loadTasks', tasks || {}))
        },
        async getTaskById(ctx, id) {
            await fetchTaskById(id)
                .then(task => ctx.commit('setCurrentTask', {task, id}))
        },
        async createTask(ctx, task) {
            await postTask(task)
                .then(json => json.name )
                .then((id) => ctx.commit('addTask', {id, task}))
        },
        async updateTask(ctx, task) {
            const id = ctx.state.currentId
            await patchTask(id, task)
                .then(() => ctx.commit('saveTask', {id, task}))
        },
        async completeTask(ctx) {
            const id = ctx.state.currentId
            const task = {
                status: 'completed'
            }
            await patchTask(id, task)
                .then(() => ctx.commit('saveTask', {id, task}))
        }
    },
    getters: {
        tasks: state => Object.entries(state.tasks).map(el => ({id: el[0], ...el[1]})),
        currentTask: state => state.currentTask,
        currentId: state => state.currentId
    },
    modules: {}
})

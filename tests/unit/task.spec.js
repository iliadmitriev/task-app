import {mount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import 'materialize-css/dist/js/materialize.min'
import Task from "@/views/Task"
import store from '@/store'
import routes from "@/router/routes"

const localVue = createLocalVue()
localVue.use(Vuex)
const router = new VueRouter({mode: 'history', routes})

const router_push = jest.fn()

const task = {
    "chips": [{"tag": "tag"}],
    "description": "task description",
    "dueDate": "2021-01-02T12:00:00.000Z",
    "status": "active",
    "title": "task title"
}
global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve(task),
    })
)

describe('Task.vue component test', () => {

    const wrapper = mount(Task, {
        localVue,
        store,
        router,
        mocks: {
            $route: {
                path: '/task/taskId',
                params: {
                    id: 'taskId'
                }
            },
            $router: {
                push: router_push
            }
        }
    })


    beforeEach(() => {
        fetch.mockClear();
        router_push.mockClear();
    })

    it('Check task fetch', async () => {

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.find('#dueDate').element.value)
            .toBe('2021-01-02')

        expect(wrapper.find('#description').element.value)
            .toBe('task description')

        expect(wrapper.find('#title').element.value)
            .toBe('task title')
    })

    it('Submit task data', async () => {
        wrapper.find('#taskSubmitForm').trigger('submit')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(router_push).toBeCalledTimes(1)
        expect(router_push).toHaveBeenCalledWith('/')

    })

    it('Complete task', async () => {
        await wrapper.find('#completeHandler').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(router_push).toBeCalledTimes(1)
        expect(router_push).toHaveBeenCalledWith('/')

    })

    it('Try to fetch not existing task', () => {

        const getTaskById = jest.fn()
        const currentTask = jest.fn()
        currentTask.mockReturnValue(null)
        const wrapper = mount(Task, {
            localVue: createLocalVue(),
            store: new Vuex.Store({
                actions: {
                    getTaskById
                },
                getters: {
                    currentTask
                }
            }),
            mocks: {
                $route: {
                    path: '/task/taskId',
                    params: {
                        id: 'taskId'
                    }
                }
            }
        })

        expect(getTaskById).toHaveBeenCalledTimes(1)
        expect(currentTask).toHaveBeenCalledTimes(1)


    })

    it('Try to fetch task with empty chips', () => {

        const getTaskById = jest.fn()
        const currentTask = jest.fn()
        currentTask.mockReturnValue({
            "description": "task description",
            "dueDate": "2021-01-02T12:00:00.000Z",
            "status": "active",
            "title": "task title"
        })
        const wrapper = mount(Task, {
            localVue: createLocalVue(),
            store: new Vuex.Store({
                actions: {
                    getTaskById
                },
                getters: {
                    currentTask
                }
            }),
            mocks: {
                $route: {
                    path: '/task/taskId',
                    params: {
                        id: 'taskId'
                    }
                }
            }
        })

        expect(getTaskById).toHaveBeenCalledTimes(1)
        expect(currentTask).toHaveBeenCalledTimes(1)



    })

})
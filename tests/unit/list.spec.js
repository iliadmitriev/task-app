import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'

import 'materialize-css/dist/js/materialize.min'
import List from "@/views/List"
import store from '@/store'

const localVue = createLocalVue()
localVue.use(Vuex)

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
            ID1: {
                chips: [{tag: "tag1"}],
                description: "description 1",
                dueDate: "2021-01-02T21:00:00.000Z",
                status: "completed",
                title: "title 1"
            },
            ID2: {
                description: "description 2",
                dueDate: "2021-01-30T21:00:00.000Z",
                status: "active",
                title: "title 2"
            }
        })
    })
)
const dateFormat = jest.fn()
const truncate = jest.fn()
localVue.filter('dateFormat', dateFormat)
localVue.filter('truncate', truncate)

describe('List.vue component test',  () => {

    let wrapper


    beforeEach(() => {
        fetch.mockClear()
        wrapper = mount(List, {
            localVue,
            store,
            stubs: ['router-link']
        })
    })

    it('Check list of tasks with filter "outdated"',  () => {
        expect(dateFormat).toHaveBeenCalledTimes(2)
        expect(truncate).toHaveBeenCalledTimes(2)

        wrapper.setData({filterByStatus: "outdated"})
        expect(wrapper.vm.displayTasks.length).toBe(1)

    })

    it('Check list of tasks with filter "active"', () => {

        wrapper.setData({filterByStatus: "active"})
        expect(wrapper.vm.displayTasks.length).toBe(1)

    })

    it('Check list of tasks with filter "active" with no active tasks', async () => {
        wrapper.setData({
            filterByStatus: "nonexistent",
            $filterByStatus: {
                input: {
                    value: null
                }
            }
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.displayTasks.length).toBe(0)
        expect(wrapper.find('#filterClear').exists()).toBe(true)
        await wrapper.find('#filterClear').trigger('click')

        expect(wrapper.vm.displayTasks.length).toBe(2)

    })

    it('Destroy List.vue uninitialized', async () => {
        wrapper.setData({
            filterByStatus: null,
            $filterByStatus: null
        })
        await wrapper.vm.$nextTick()
        wrapper.destroy()
    })

    it('Destroy List.vue initialized with data', async () => {
        const destroyFn = jest.fn()
        wrapper.setData({
            filterByStatus: "nonexistent",
            $filterByStatus: {
                input: {
                    value: null
                },
                destroy: destroyFn
            }
        })
        await wrapper.vm.$nextTick()
        wrapper.destroy()
        expect(destroyFn).toHaveBeenCalledTimes(1)
    })
})
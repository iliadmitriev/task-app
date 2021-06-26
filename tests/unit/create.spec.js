import {mount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import 'materialize-css/dist/js/materialize.min'
import Create from "@/views/Create"
import store from '@/store'
import routes from "@/router/routes"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter({mode: 'history', routes})

router.push = jest.fn()
global.fetch = jest.fn()
const dueDateDestroy = jest.fn()
const chipsDestroy = jest.fn()

describe('Create.vue component test',  () => {

    let wrapper
    const testDate = new Date()

    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({name: 'newId'}),
        })
    );

    beforeEach(() => {
        wrapper = mount(Create, {
            localVue,
            store,
            router
        })

        fetch.mockClear();
        dueDateDestroy.mockClear()
        chipsDestroy.mockClear()
    });



    it('Submit filled form', async () => {
        const titleInput = wrapper.find('#title')
        const descriptionInput = wrapper.find('#description')
        const form = wrapper.find('form#createTask')

        expect(store.getters.tasks).toStrictEqual([])

        titleInput.setValue('new title')
        descriptionInput.setValue('new description')
        wrapper.setData({
            dueDate: {
                date: testDate,
            },
            chips: {
                chipsData: ["tag1", "tag2"],
            }
        })
        await form.trigger('submit.prevent')

        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(router.push).toHaveBeenCalledWith('/')
        expect(router.push).toHaveBeenCalledTimes(1)

        expect(store.state.tasks.newId).toBeTruthy()
        expect(store.state.tasks.newId).toStrictEqual({
            title: 'new title',
            description: 'new description',
            chips: ["tag1", "tag2"],
            dueDate: testDate,
            status: 'active'
        })

    })

    it('Destroy Create.vue component uninitialized', () => {
        wrapper.setData({
            dueDate: null,
            chips: null,
        })

        wrapper.destroy()

        expect(dueDateDestroy).toHaveBeenCalledTimes(0)
        expect(chipsDestroy).toHaveBeenCalledTimes(0)
    })

    it('Destroy Create.vue component initialized', () => {
        wrapper.setData({
            dueDate: {
                date: testDate,
                destroy: dueDateDestroy
            },
            chips: {
                chipsData: ["tag1", "tag2"],
                destroy: chipsDestroy
            }
        })
        wrapper.destroy()
        expect(dueDateDestroy).toHaveBeenCalledTimes(1)
        expect(chipsDestroy).toHaveBeenCalledTimes(1)
    })

})
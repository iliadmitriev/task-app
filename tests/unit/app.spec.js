import {mount, createLocalVue} from '@vue/test-utils'

import 'materialize-css/dist/js/materialize.min';
import App from "@/App.vue";
import Navbar from '@/components/Navbar.vue';
import Create from "@/views/Create";
import List from "@/views/List";
import Task from "@/views/Task";
import routes from "@/router/routes";

import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter({mode: 'history', routes})
import store from '@/store'

import {filterTruncate, dateFormat} from "@/filters";

localVue.filter('dateFormat', dateFormat)
localVue.filter('truncate', filterTruncate)


global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
            "-MRUXmq3erehKfwqXXI7": {
                "chips": [
                    {
                        "tag": "Задача"
                    }
                ],
                "description": "Приятно, граждане, наблюдать, как элементы политического процесса могут быть подвергнуты целой серии независимых исследований. Приятно, граждане, наблюдать, как сторонники тоталитаризма в науке призывают нас к новым свершениям, которые, в свою очередь, должны быть ограничены исключительно образом мышления. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности способствует повышению качества соответствующих условий активизации.",
                "dueDate": "2021-01-02T21:00:00.000Z",
                "status": "completed",
                "title": "Давайте разбираться: кровь стынет в жилах"
            },
            "-MRUff2XvCWaLptyFp9D": {
                "description": "Являясь всего лишь частью общей картины, интерактивные прототипы лишь добавляют фракционных разногласий и объективно рассмотрены соответствующими инстанциями. Есть над чем задуматься: акционеры крупнейших компаний могут быть описаны максимально подробно. В целом, конечно, консультация с широким активом, в своём классическом представлении, допускает внедрение экономической целесообразности принимаемых решений.",
                "dueDate": "2021-01-30T21:00:00.000Z",
                "status": "active",
                "title": "Воистину радостный звук: песнь светлого будущего"
            }
        }),
    })
);


describe('App', () => {

    beforeEach(() => {
        //fetch.mockClear();
    });

    const wrapper = mount(App, {
        localVue,
        store,
        router
    })

    it('Render Application', async () => {

        expect(wrapper.findComponent(Navbar)).toBeTruthy()
        expect(wrapper.findComponent(List).exists()).toBe(true)

    })

    it('Go to Create route and find component', async () => {
        await router.push('/create')
        expect(wrapper.findComponent(Create).exists()).toBe(true)

    })

    it('Go to Task with specified id', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(
                    {
                        "chips": [{"tag": "Задача"}],
                        "description": "Приятно, граждане, наблюдать, как элементы политического",
                        "dueDate": "2021-01-02T21:00:00.000Z",
                        "status": "completed",
                        "title": "Давайте разбираться: кровь стынет в жилах"
                    }
                )
            })
        )

        await router.push('/task/ID')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(Task).exists()).toBe(true)

    })

})
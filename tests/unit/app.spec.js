import {mount, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'

import App from "@/App.vue";
import 'materialize-css/dist/js/materialize.min'
import Navbar from '@/components/Navbar.vue';

//import {fetchAllTasks} from '@/store/firebase'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()


describe('App', () => {
    const wrapper = mount(App, {
        localVue,
        router
    })

    it('Render Application', async () => {

        expect(wrapper.findComponent(Navbar)).toBeTruthy()
    })

})
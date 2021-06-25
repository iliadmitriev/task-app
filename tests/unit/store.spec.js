import {createLocalVue} from "@vue/test-utils";
import Vuex from 'vuex';
import store from '@/store'

const localVue = createLocalVue()

global.fetch = jest.fn()

localVue.use(Vuex)

describe('Vuex Store', () => {
    const responseList = {
        "ID1": {
            "chips": [
                {
                    "tag": "tag1"
                }
            ],
            "description": "description 1",
            "dueDate": "2021-01-02T21:00:00.000Z",
            "status": "completed",
            "title": "title 1"
        },
        "ID2": {
            "description": "description 2",
            "dueDate": "2021-01-30T21:00:00.000Z",
            "status": "active",
            "title": "title 2"
        }
    }
    const newTask = {
        "chips": [{"tag": "tag"}],
        "description": "new description",
        "dueDate": "2021-01-02T21:00:00.000Z",
        "status": "active",
        "title": "new title"
    }
    const responseCreate = {"name": "newId"}

    beforeEach(() => {
        fetch.mockClear();
    });

    it('Check initial store state', () => {
        expect(store.state.currentId).toBe(null)
        expect(store.state.tasks).toStrictEqual([])
        expect(store.state.currentTask).toBe(null)
    })

    it('Check getAllTasks action, when fetch returns null', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(null),
            })
        );

        await store.dispatch('getAllTasks')
        expect(store.state.tasks).toStrictEqual({})
    });

    it('Check getAllTasks action', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(responseList),
            })
        );

        await store.dispatch('getAllTasks')
        expect(store.state.tasks).toStrictEqual(responseList)
    });

    it('Check createTask action', async () => {
        fetch
            .mockImplementationOnce(() => Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(responseCreate),
                })
            );

        await store.dispatch('createTask', newTask)
        expect(store.state.tasks).toStrictEqual({...responseList, 'newId': newTask})

    })

    it('Check mutation setCurrentTask', async () => {
        store.commit('setCurrentTask', {task: newTask, id: 'newId'})
        expect(store.state.currentTask).toStrictEqual(newTask)
        expect(store.state.currentId).toBe('newId')
    })

    it('Check updateTask action, updating current task', async () => {
        fetch
            .mockImplementationOnce(() => Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve(responseCreate),
                })
            );

        await store.dispatch('updateTask', newTask)
        expect(store.getters.currentTask).toStrictEqual(newTask)
        expect(store.getters.currentId).toBe('newId')
    })

    it('Check completeTask action, completing current task', async () => {
        fetch
            .mockImplementationOnce(() => Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({"status":"completed"}),
                })
            );

        await store.dispatch('completeTask')
        const tasks = store.getters.tasks
        const task = tasks.find(x => x.id === 'newId')

        expect(task).toBeTruthy()
        expect(task.status).toBe('completed');
    })
})
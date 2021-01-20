const httpFirebase = (method = 'GET', path, data) => {
    const urlBase = 'https://task-app-idm-default-rtdb.europe-west1.firebasedatabase.app'
    const url = `${urlBase}${path}`
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: "follow",
        cache: "no-cache",
        body: data ? JSON.stringify(data) : null
    })
        .then(response => response.status === 200 ? response.json() : null)
}

const fetchAllTasks = () => {
    return httpFirebase('GET', '/task.json')
}


const fetchTaskById = id => {
    return httpFirebase('GET', `/task/${id}.json`)
}

const postTask = async (data) => {
    return await httpFirebase('POST', `/task.json`, data)
}

const patchTask = async(id, data) => {
    return await httpFirebase('PATCH', `/task/${id}.json`, data)
}

export {fetchAllTasks, fetchTaskById, postTask, patchTask}

export function setLoadedTasks (tasks) {
    return {
        type: 'LOAD_TASK_LIST',
        tasks
    }
}

export function addTask (task) {
    return {
        type: 'ADD_TASK',
        task
    }
}

export function delTask (id) {
    return {
        type: 'DEL_TASK',
        id
    }
}




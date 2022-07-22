export function setLoadedTasks (tasks) {
    return {
        type: 'LOAD_TASK_LIST',
        tasks
    }
}

export function addTasks (task) {
    return {
        type: 'ADD_TASK',
        task
    }
}



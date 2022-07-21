function setLoadedTasks (tasks) {
    return {
        type: 'LOAD_TASK_LIST',
        tasks
    }
}

export default setLoadedTasks;
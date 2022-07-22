export default function (state = [], action) {
  switch (action.type) {
    case 'LOAD_TASK_LIST': return action.tasks
    case 'ADD_TASK': return [...state, action.task]
    default:
      return state
  }
}


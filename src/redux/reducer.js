export default function (state = [], action) {
  switch (action.type) {
    case 'LOAD_TASK_LIST': return action.tasks
    case 'ADD_TASK': return [...state, action.task]
    case 'DEL_TASK': return state.filter(obj => obj.id !== action.id)
    default:
      return state
  }
}


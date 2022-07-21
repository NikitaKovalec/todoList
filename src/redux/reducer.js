export default function (state = [], action) {
  switch (action.type) {
    case 'LOAD_TASK_LIST': return action.tasks
    default:
      return state
  }
}


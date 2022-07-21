export default function (state = [], action) {
  switch (action.type) {
    case 'ADD_TASK_LIST': return state = [...action.tasks]
    default:
      return state
  }
}


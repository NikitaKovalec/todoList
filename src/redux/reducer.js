const fetchingTasks = async () => {
  try {
    const response = await fetch('http://localhost:3100/tasks', {
      mode: 'cors'
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw 'err'
    }
  } catch (e) {
    console.log('Ошибка загрузки тасков')
  }
}

const initialState = fetchingTasks()

export default function (state = initialState, action) {
  if(action.type === 'TASK_LIST') {
    return initialState
  }
  return state
}


import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Task from './Components/Task';
import Form from './Components/Form';
import {setLoadedTasks, addTask, delTask} from "./redux/action";
import Dropdown from "./Components/Dropdown";

function App() {
  let [value, setValue] = useState("")
  let [isLoading, setIsLoading] = useState(true)
  let [isSaving, setIsSaving] = useState(false)
  let [isError, setIsError] = useState(false)
  let [isErrorSave, setIsErrorSave] = useState(false)
  const dispatch = useDispatch()
  const tasks = useSelector(state => state)

  const options = ['Выполняется', 'Выполнено', 'Отложено']

  const fetchingTasks = async () => {
    try {
      const response = await fetch('http://localhost:3100/tasks', {
        mode: 'cors'
      })
      if (response.ok) {
        const data = await response.json()
        dispatch(setLoadedTasks(data))
      } else {
        throw 'err'
      }
    } catch (e) {
      console.log('Ошибка загрузки тасков')
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchingTasks()
  }, [])

  async function save() {
    setIsErrorSave(false)
    setIsSaving(true)
    try {
      const response = await fetch('http://localhost:3100/tasks', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({value})
      })
      if (response.ok) {
        const newTasks = await response.json()
        dispatch(addTask(newTasks))
      } else {
        throw 'err'
      }
    } catch (e) {
      console.log('Ошибка при создании')
      setIsErrorSave(true)
    } finally {
      setIsSaving(false)
    }
    setValue("")
  }

  async function changeValue(id, inputValue) {
    let newTasks = [...tasks]
    let task = newTasks.find(obj => obj.id === id)
    let index = newTasks.findIndex(obj => obj.id === id)
    let newTask = {...task}
    newTask.value = inputValue
    newTasks.splice(index, 1, newTask)
    try {
      const response = await fetch('http://localhost:3100/tasks/' + id, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      if (response.ok) {
        dispatch(setLoadedTasks(newTasks))
      } else {
        throw 'err'
      }
    } catch (e) {
      console.log('Ошибка при редактировании')
    }
  }

  async function del(id) {
    if (window.confirm("Удаляю?")) {
      try {
        const response = await fetch('http://localhost:3100/tasks/' + id, {
          mode: 'cors',
          method: 'DELETE'
        })
        if (response.ok) {
          dispatch(delTask(id))
        } else {
          throw 'err'
        }
      } catch (e) {
        console.log('Ошибка при удалении')
      }
    }
  }

  return <>
    <Form setValue={setValue}
          save={save}
          value={value}
          isSaving={isSaving}
          isErrorSave={isErrorSave}
    />
    {isError ? <div style={{marginLeft: 15}}>Ошибка загрузки данных...</div> : <></>}
    {isLoading ? <div style={{marginLeft: 15}}>Загрузка данных...</div> :
      tasks.map(({value, id}) =>
        <Task key={id}
              id={id}
              value={value}
              changeValue={changeValue}
              del={del}
        />
      )}
    <Dropdown
        options={options}
    />
  </>
}


export default App;

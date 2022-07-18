import React, {useEffect, useState} from 'react';
import Task from './Components/Task';
import Form from './Components/Form';

function App() {
  let [tasks, setTasks] = useState([])
  let [value, setValue] = useState("")
  let [isLoading, setIsLoading] = useState(true)
  let [isSaving, setIsSaving] = useState(false)
  let [isError, setIsError] = useState(false)
  let [isErrorSave, setIsErrorSave] = useState(false)

  const fetchingTasks = async () => {
    try {
      const response = await fetch('http://localhost:3100/tasks', {
        mode: 'cors'
      })
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
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
        setTasks([...tasks, newTasks])
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
    let findValue = tasks.find(obj => obj.id === id)
    findValue.value = inputValue
    try {
      const response = await fetch('http://localhost:3100/tasks/' + id, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(findValue)
      })
      if (response.ok) {
        setTasks([...tasks])
      } else {
        throw 'err'
      }
    } catch (e) {
      console.log('Ошибка при создании')
      console.log(e)
      setIsErrorSave(true)
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
          setTasks(tasks.filter(obj => obj.id !== id))
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
  </>
}

export default App;

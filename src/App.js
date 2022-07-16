import React, {useEffect, useState} from 'react';
import Task from './Components/Task';
import Form from './Components/Form';

function App() {
  let [tasks, setTasks] = useState([])
  let [value, setValue] = useState("")
  let [isLoading, setIsLoading] = useState(true)
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
    try {
      const response = await fetch('http://localhost:3100/tassks', {
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
      setIsLoading(false)
    }
    setValue("")
  }

  function changeValue(id, inputValue) {
    let findValue = tasks.find(obj => obj.id === id)
    findValue.value = inputValue
    setTasks([...tasks])
  }

  function del(id) {
    if (window.confirm("Удаляю?")) {
      setTasks(tasks.filter(obj => obj.id !== id))
    }
  }

  return <>
    <Form setValue={setValue}
          save={save}
          value={value}
          isLoading={isLoading}
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

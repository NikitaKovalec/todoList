import React, {useEffect, useState} from 'react';
import Task from './Components/Task';
import Form from './Components/Form';

let id = 0

function App() {
  let [arr, setArr] = useState([])
  let [value, setValue] = useState("")
  let [isLoading, setIsLoading] = useState(true)
  let [isError, setIsError] = useState(false)

  const fetchingTasks = async () => {
    try {
      const response = await fetch('http://localhost:3100/tasks', {
        mode: 'cors'
      })
      if (response.ok) {
        const data = await response.json()
        setArr(data)
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

  function del(id) {
    if (window.confirm("Удаляю?")) {
      setArr(arr.filter(obj => obj.id !== id))
    }
  }

  function changeValue(id, inputValue) {
    let findValue = arr.find(obj => obj.id === id)
    findValue.value = inputValue
    setArr([...arr])
  }

  function save() {
    id += 1
    setArr([...arr, {value, id}])
    setValue("")
  }

  return <>
    <Form setValue={setValue}
          save={save}
          value={value}
    />
    {isError ? <div style={{marginLeft: 15}}>Ошибка загрузки данных...</div> : <></>}
    {isLoading ? <div style={{marginLeft: 15}}>Загрузка данных...</div> :
      arr.map(({value, id}) =>
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

import React, {useEffect, useState} from 'react';
import Task from './Components/Task';
import Form from './Components/Form';

let id = 0

function App() {
  let [arr, setArr] = useState(() => JSON.parse(localStorage.getItem('task')) || [])
  let [value, setValue] = useState("")

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(arr))
  }, [arr])

  function del(id) {
    if (window.confirm("Удаляю?") === true) {
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
    {arr.map(({value, id}) =>
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

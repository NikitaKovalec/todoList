import React, {useState} from 'react';
import Task from './Components/Task';
import Form from './Components/Form';

let id = 0

function App() {
  let [arr, setArr] = useState([])
  let [value, setValue] = useState("")

  function del(id) {
    setArr(arr.filter(obj => obj.id !== id))
  }

  function changeValue(inputValue) {
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

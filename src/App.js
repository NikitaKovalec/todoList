import React, { useState } from 'react';

function App() {
  let [value, setValue] = useState("");
  let [arr, setArr] = useState([])

  function save () {
    const div = <div>{value}</div>
    setArr([...arr, div]);
    setValue("")
  }

  return <>
    <input value={value} onChange={(event) => setValue(event.target.value)}/>
    <button disabled={!value ? true : false} onClick={save}>Добавить</button>
    {arr}
  </>
}

// function App() {
//   let [state, setState] = useState(true);
//
//   return <>
//     <input onFocus={() => setState(false)} onBlur={() => setState(true)}/>
//     {state ? <button disabled={true}>Добавить</button> : <button disabled={false}>Добавить</button>}
//   </>
//
// }

export default App;

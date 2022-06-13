import React, { useState } from 'react';

function App() {
  let [value, setValue] = useState("");
  let [adding, setAdding] = useState(<></>);

  function save () {
    setAdding(<div>{value}</div>);
    setValue("")
  }

  return <>
    <input value={value} onChange={(event) => setValue(event.target.value)}/>
    <button disabled={!value ? true : false} onClick={save}>Добавить</button>
    {adding}
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

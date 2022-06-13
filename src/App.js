import React, { useState } from 'react';

function App() {
  let [value, setValue] = useState("");
  let [arr, setArr] = useState([])

  function save () {
    const div = <div
        style={{
            width: "100px",
            margin: "15px",
            padding: "5px 10px",
            border: "0.5px solid #4676D7",
            borderRadius: "4px"
        }}
    >{value}</div>
    setArr([...arr, div]);
    setValue("")
  }

  return <>
    <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{
          width: "200px",
          height: "35px",
          margin: "15px",
          padding: "5px 10px",
          border: "0.5px solid #bdbdbd",
          borderRadius: "4px"
        }}
    />
    <button disabled={!value ? true : false}
            onClick={save}
            style={{
              border: "0",
              borderRadius: "5px",
              background: "#4676D7",
              color: "#fff",
              padding: "15px 20px",
              fontSize: "16px"
            }}
    >Добавить</button>
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

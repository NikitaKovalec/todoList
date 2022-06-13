import React, { useState } from 'react';

function App() {
  let [value, setValue] = useState("");
  let [arr, setArr] = useState([]);
  const disabled = !value;
  const color = disabled ? "#333333" : "#4676D7";

  function save () {
    const div = <div
        style={{
            width: 100,
            margin: 15,
            padding: "5px 10px",
            border: "1px solid #4676D7",
            borderRadius: 4
        }}
    >{value}</div>;
    setArr([...arr, div]);
    setValue("")
  }

  return <>
    <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{
          width: 200,
          height: 35,
          margin: 15,
          padding: "5px 10px",
          border: "1px solid #bdbdbd",
          borderRadius: 4
        }}
    />
    <button
        disabled={disabled}
        onClick={save}
        style={{
          border: "none",
          borderRadius: 5,
          background: color,
          color: "#fff",
          padding: "15px 20px",
          fontSize: 16
        }}
    >Добавить</button>
    {arr}
  </>
}

export default App;

import React, { useState } from 'react';

function App() {
  let [value, setValue] = useState("");
  let [arr, setArr] = useState([]);
  const disabled = !value;
  let obj = {
      id: arr.length + 1,
      value: value
  };


  function save () {
    setArr([...arr, obj]);
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
            background: disabled ? "#333333" : "#4676D7",
            color: "#fff",
            padding: "15px 20px",
            fontSize: 16
        }}
    >Добавить</button>
    {arr.map(function (obj) {
        return <div
            key={obj.id}
            style={{
            width: 200,
            margin: 15,
            padding: "5px 10px",
            border: "1px solid #4676D7",
            borderRadius: 4
        }}
        >{obj.value}</div>})}
  </>
}

export default App;

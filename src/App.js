import React, { useState } from 'react';
let id = 0

function App() {
  let [value, setValue] = useState("");
  let [arr, setArr] = useState([]);
  const disabled = !value;

  function save () {
    id += 1;
    setArr([...arr, {value, id}]);
    setValue("")
  }

  function del (id) {
      setArr([...arr.slice(id)])
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
    {arr.map(function ({value, id}) {
        return <div
            key={id}
            style={{
                display: "flex"
            }}>
            <div
                key={id + 1}
                style={{
                    width: 200,
                    height: 40,
                    margin: 15,
                    padding: "5px 10px",
                    border: "1px solid #4676D7",
                    borderRadius: 4
                }}
            >{value}</div>
            <button
                key={id + 2}
                onClick={() => del(id)}
                style={{
                    width: 111,
                    height: 52,
                    border: "none",
                    marginTop: 15,
                    padding: "15px 20px",
                    borderRadius: 4,
                    background: "#4676D7",
                    color: "#fff",
                    fontSize: 16
                }}
            >Удалить</button>
        </div>})}
  </>
}

export default App;

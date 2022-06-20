import React from "react";
import {useState} from "react";

function Editing({id, del, save, value, edit, isEditing}) {
  let [inputValue, setInputValue] = useState(value)

  return <div
    style={{
      display: "flex",
    }}
  >
    <div
      style={{
        marginTop: 15
      }}
    >
      {"Задача №" + id}
    </div>
    {!isEditing ?
      <div
        style={{
          width: 200,
          height: 40,
          margin: 15,
          padding: "5px 10px",
          border: "1px solid #4676D7",
          borderRadius: 4,
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {isEditing ? inputValue : value}
      </div> :
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        style={{
          width: 200,
          height: 35,
          margin: 15,
          padding: "5px 10px",
          border: "1px solid #bdbdbd",
          borderRadius: 4
        }}
      />}
    <button
      onClick={isEditing ? save : edit}
      style={{
        width: 150,
        height: 52,
        border: "none",
        margin: "15px 5px 0px 0px",
        padding: "15px 20px",
        borderRadius: 4,
        background: "#4676D7",
        color: "#fff",
        fontSize: 16
      }}
    >
      {isEditing ? "Сохранить" : "Редактировать"}
    </button>
    <button
      onClick={() => del(id)}
      style={{
        width: 111,
        height: 52,
        border: "none",
        marginTop: 15,
        padding: "15px 20px",
        borderRadius: 4,
        background: "#d50000",
        color: "#fff",
        fontSize: 16
      }}
    >
      Удалить
    </button>
  </div>
}

export default Editing;
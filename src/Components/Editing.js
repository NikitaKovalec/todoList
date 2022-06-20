import React from "react";

function Editing({value, id, del, save, isEditing, edit, setValue}) {
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
    {isEditing ?
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
        {value}
      </div> :
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
      />}
    <button
      onClick={isEditing ? edit : save}
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
      {isEditing ? "Редактировать" : "Сохранить"}
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
import React, {useState} from "react";

function Editing(prop) {
  let [isEditing, setIsEditing] = useState(true)

  function edit() {
    setIsEditing(!isEditing)
  }

  return <>

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
        {prop.value}
      </div>
      :
      <input
        value={prop.value}
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

  </>
}

export default Editing;
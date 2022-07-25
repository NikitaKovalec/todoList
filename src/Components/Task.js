import React, {useState} from "react";

function Task({id, del, value, changeValue}) {
  let [inputValue, setInputValue] = useState(value)
  let [isEditing, setIsEditing] = useState(false)
  let [isDeleting, setIsDeleting] = useState(false)
  let [isSaving, setIsSaving] = useState(false)
  const disabled = isDeleting || isSaving

  async function change() {
    setIsSaving(true)
    await changeValue(id, inputValue)
    setIsSaving(false)
    setIsEditing(false)
  }

  async function removeTask() {
    setIsDeleting(true)
    await del(id)
    setIsDeleting(false)
  }

  return <div
    style={{
      display: "flex",
    }}
  >
    {isEditing ?
      <input
        disabled={disabled}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        style={{
          width: 200,
          height: 40,
          margin: 15,
          padding: "5px 10px",
          border: "1px solid #bdbdbd",
          borderRadius: 4
        }}
      /> :
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
      </div>
    }
    { isEditing ?
    <button
      disabled={disabled}
      onClick={change}
      style={{
        width: 150,
        height: 52,
        border: "none",
        margin: "15px 5px 0px 0px",
        padding: "15px 20px",
        borderRadius: 4,
        background: disabled ? "#333333" : "#4676D7",
        color: "#fff",
        fontSize: 16
      }}
    >
      {isSaving ? 'Сохраняю...' : 'Сохранить'}
    </button> :
    <button
      disabled={disabled}
      onClick={isEditing ? change : () => setIsEditing(true)}
      style={{
        width: 150,
        height: 52,
        border: "none",
        margin: "15px 5px 0px 0px",
        padding: "15px 20px",
        borderRadius: 4,
        background: disabled ? "#333333" : "#4676D7",
        color: "#fff",
        fontSize: 16
      }}
    >
      Редактировать
    </button>
    }
    <button
      disabled={disabled}
      onClick={removeTask}
      style={{
        width: 111,
        height: 52,
        border: "none",
        marginTop: 15,
        padding: "15px 20px",
        borderRadius: 4,
        background: disabled ? "#333333" : "#d50000",
        color: "#fff",
        fontSize: 16
      }}
    >
      {isDeleting ? 'Удаляю...' : 'Удалить'}
    </button>
  </div>
}

export default Task;
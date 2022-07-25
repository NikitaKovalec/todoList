import React from "react";

function Form({value, setValue, save, isSaving, isErrorSave}) {
  const disabled = !value || isSaving
  return <>
    <input
      value={value}
      data-test-id='formInput'
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
      data-test-id='addButton'
      onClick={save}
      style={{
        border: "none",
        borderRadius: 5,
        background: disabled ? "#333333" : "#4676D7",
        marginRight: 10,
        color: "#fff",
        padding: "15px 20px",
        fontSize: 16
      }}
    >
      {isSaving ? 'Добавляю...' : 'Добавить'}
    </button>
    {isErrorSave ? <div style={{marginLeft: 15}}>Ошибка при создании...</div> : <></>}
  </>
}

export default Form
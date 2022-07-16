import React from "react";

function Form({value, setValue, save, isLoading, isErrorSave, setIsErrorSave}) {
  const disabled = !value && isErrorSave && !isLoading

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
      onClick={isErrorSave ? () => setIsErrorSave(false) : save}
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
      {isLoading ? 'Добавляю...' : 'Добавить'}
    </button>
    {isErrorSave ? <div style={{marginLeft: 15}}>Ошибка при создании...</div> : <></>}
  </>
}

export default Form
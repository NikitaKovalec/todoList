function Form({value, setValue, save}) {
  const disabled = !value

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
    >
      Добавить
    </button>
  </>
}

export default Form
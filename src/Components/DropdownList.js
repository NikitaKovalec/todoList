import React, {useState} from "react"

function DropdownList({value, selectStatus}) {
    let [isHighlighted, setIsHighlighted] = useState(false)

    async function changeValues(){
        await selectStatus(value)
        setIsHighlighted(true)

        console.log(isHighlighted)
    }

    return <div onClick={changeValues}
                style={{
                    padding: 5,
                    borderBottom: "1px solid #bdbdbd",
                    backgroundColor: isHighlighted ? "#bdbdbd" : "#fff",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}
    >{value}</div>
}

export default DropdownList;
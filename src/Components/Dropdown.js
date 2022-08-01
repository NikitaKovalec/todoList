import React, {useEffect, useRef, useState} from "react"

function Dropdown({tasks}) {
    let [isOpen, setIsOpen] = useState(false)
    let [selection, setSelection] = useState('--')
    const ref = useRef()
    let highlighter = false
    const newArr = [...tasks]

    const clickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickOutside, true)
        return () => {
            document.removeEventListener('click', clickOutside)
        }
    })

    const selectTask = (taskValue, taskId) => {
        const findTask = newArr.find(obj => obj.id === taskId)
        const findTaskId = findTask.id
        if (taskId === findTaskId) {
            highlighter = true
        }
        setSelection(taskValue)
        setIsOpen(false)
    }
    console.log(isOpen)
    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 200,
            height: 20,
            margin: "15px 0 0 15px",
            padding: "5px 10px",
            border: "1px solid #4676D7",
            borderRadius: 4
        }}
             onClick={() => setIsOpen(!isOpen)}>
            <div>{selection}</div>
            <div>{isOpen ? 'Закрыть' : 'Открыть'}</div>
        </div>
        <div>
            {isOpen ?
                <div ref={ref}
                     style={{
                         width: 200,
                         margin: "5px 0 0 15px",
                         padding: 10,
                         border: "1px solid #4676D7",
                         borderRadius: 4
                     }}>
                    {newArr.map(({id, value}) =>
                        <div key={id}
                             onClick={() => selectTask(value, id)}
                             style={{
                                 padding: 5,
                                 borderBottom: "1px solid #bdbdbd",
                                 backgroundColor: highlighter ? "#bdbdbd" : "#fff",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis"
                             }}
                        >{value}</div>
                    )}
                </div> : <></>}
        </div>
    </>
}

export default Dropdown;
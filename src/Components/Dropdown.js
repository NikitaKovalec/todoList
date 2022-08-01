import React, {useEffect, useRef, useState} from "react"
import DropdownList from "./DropdownList";

function Dropdown({status}) {
    let [isOpen, setIsOpen] = useState(false)
    let [selection, setSelection] = useState('--')
    const ref = useRef()

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

    const selectStatus = (statusValue) => {
        setSelection(statusValue)
        setIsOpen(false)
    }

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
                    {status.map((value, index) =>
                        <DropdownList
                            selectStatus={selectStatus}
                            key={index}
                            value={value}
                        />
                    )}
                </div> : <></>}
        </div>
    </>
}

export default Dropdown;
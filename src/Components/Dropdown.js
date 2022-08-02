import React, {useEffect, useRef, useState} from "react"

function Dropdown({options}) {
    let [isOpen, setIsOpen] = useState(false)
    let [selectedIndex, setSelectedIndex] = useState()

    const ref = useRef(null)

    const clickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', clickOutside, true)
            return () => {
                document.removeEventListener('click', clickOutside, true)
            }
        }
    }, [isOpen])

    const changeValues = (optionValue, optionIndex) => {
        setSelectedIndex(optionIndex)
        setIsOpen(false)
    }

    return <div ref={ref}
                style={{
                    position: 'relative'
                }}
    >
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
            <div>{selectedIndex >= 0 ? options[selectedIndex] : '--'}</div>
            <div>{isOpen ? 'Закрыть' : 'Открыть'}</div>
        </div>
        <div style={{
            position: 'absolute'
        }}>
            {isOpen ?
                <div style={{
                    width: 200,
                    margin: "5px 0 0 15px",
                    padding: 10,
                    border: "1px solid #4676D7",
                    backgroundColor: '#fff',
                    borderRadius: 4
                }}>
                    {options.map((value, index) =>
                        <div onClick={() => changeValues(value, index)}
                             key={index}
                             style={{
                                 padding: 5,
                                 borderBottom: "1px solid #bdbdbd",
                                 backgroundColor: selectedIndex === index ? "#bdbdbd" : "#fff",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis"
                             }}
                        >{value}</div>
                    )}
                </div> : <></>}
        </div>
    </div>
}

export default Dropdown;
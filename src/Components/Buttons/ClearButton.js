import React from "react"

function ClearButton(props) {
    return (
        <button onClick={props.handleClick} className="border-2 text-white font-bold py-2 px-4">
            {props.label}
        </button>
    )
}

export default ClearButton;
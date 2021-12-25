import React from "react"

function NormalButton(props) {
    return (
        <button onClick={props.handleClick} disabled={props.disabled} className="bg-blue-700 hover:bg-blue-900 text-white disabled:opacity-50 disabled:hover:bg-blue-700 font-bold py-2 px-4">
            {props.label}
        </button>
    )
}

export default NormalButton;
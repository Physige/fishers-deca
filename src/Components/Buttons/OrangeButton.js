import React from "react"

function OrangeButton(props) {
    return (
        <button onClick={props.handleClick} className="bg-orange-500 hover:bg-orange-600 transition-color duration-200 text-white font-bold py-2 px-4">
            {props.label}
        </button>
    )
}

export default OrangeButton;
import React from "react";
import './Button.css'

export default props => 
    <button className={`
        ${props.green ? 'green' : ''}
        ${props.red ? 'red' : ''}
        ${props.double ? 'double' : ''}
        button
    `} onClick={e => props.click(e.target.innerHTML)}>{props.label}</button>
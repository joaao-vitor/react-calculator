import React from "react";
import './Display.css'

function history (props){
    if(props.history.length > 0){
        return (
            <p className="history">{props.history[0] ? props.history[0] : ''} <span>{props.operation === '*' ? 'x' : props.operation}</span> {props.history[1] ? props.history[1] : ''}</p>
        );
    }
    return
}

export default props =>
    <section className="display">
        {history(props)}
        <p className="result" id="result">{props.current}</p>
    </section>

    
import React, { useState } from "react";
import './StyleGlobal.css';

const Letra = (props) => {
    return (
        <input type="text" className={props.class} maxLength={1} disabled={!(props.disabled==0)} id={props.id} style={props.style}>
            {props.valor}
        </input>
    )
}

export default Letra
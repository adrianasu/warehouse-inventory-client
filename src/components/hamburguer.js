import React from 'react';
import '../css/hamburguer.css';

function Hamburguer(props){
    return(
        <button className="toggle-button" onClick={props.click}>
            <span className="toggle-button-line"/>
            <span className="toggle-button-line"/>
            <span className="toggle-button-line"/>
        </button>
    )
}

export default Hamburguer;
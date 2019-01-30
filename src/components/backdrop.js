import React from 'react';
import '../css/backdrop.css';

function Backdrop(props){
    return(
        <div 
            className="backdrop" 
            onClick={props.backdropClickHandler}>
        </div>
    )
}

export default Backdrop;
import React from 'react';
import closeIcon from '../images/close.png';

import '../css/modal.css';

export class Modal extends React.Component{
    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    }

    handleClick() {
        this.props.onClose();
    }

    onDialogClick(event) {
        event.stopPropagation();
    }

    render(){
        return(
            <div>
                <div 
                    className="modal-overlay-div" 
                    >
                <div 
                    className="modal-content-div" 
                    >
                <div 
                    className="modal-dialog-div" 
                    onClick={this.onDialogClick}>
                    <button  
                        onClick={this.handleClick.bind(this)}
                        className="close-button">
                            <img src={ closeIcon } alt="close icon" className="icon"/>
                    </button>
                    {this.props.children}
                </div>
                </div>
                </div>  
            </div>
        )
    }
}


export default Modal;
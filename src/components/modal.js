import React from 'react';
import '../css/modal.css';

export class Modal extends React.Component{
    listenKeyboard(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.props.onClose();
        }
    }

    // componentDidMount() {
    //     if (this.props.onClose) {
    //         window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    //     }
    // }

    // componentWillUnmount() {
    //     if (this.props.onClose) {
    //         window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    //     }
    // }

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
                    // onClick={this.onOverlayClick.bind(this)}
                    >
                <div 
                    className="modal-dialog-div" 
                    onClick={this.onDialogClick}>
                    <button  
                        onClick={this.handleClick.bind(this)}>
                        X
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
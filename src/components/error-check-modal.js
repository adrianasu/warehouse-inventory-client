import React from 'react';
import { connect } from 'react-redux';

import { resetError }  from '../actions/fetch-data';
import { hideModal }  from '../actions/modal';

import Modal from './modal';
import '../css/modal-item.css';

function ErrorCheckModal (props){
   
        return(
            <Modal onClose={this.props.onClose.bind(this)}>
                <div className="item">
                    <p>{ this.props.hasErrored ? 
                        this.props.hasErrored.message : null }</p>
                </div>
            </Modal>
        )
    

}


export default ErrorCheckModal;

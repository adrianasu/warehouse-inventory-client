import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { checkInOrOutReset } from '../actions/check-in-out';
import CheckInOutTable from './check-in-out-table';
import { hideModal }  from '../actions/modal';
import Modal from './modal';
import '../css/modal-item.css';

class  CheckModal extends React.Component{
    
    onClose(){
        this.props.checkInOrOutReset();
        this.props.hideModal();
    }

    render(){
 
        return(
            <Modal onClose={this.onClose.bind(this)}>
                    <div className="item">
                <ReactToPrint
                    trigger={() => <button><FontAwesomeIcon icon="print" /></button>}
                    content={() => this.componentRef }
                    closeAfterPrint={true}
                    />
                    <h1>{ this.props.data.product.name }</h1>
                    <CheckInOutTable ref={el => (this.componentRef = el )} data={ this.props } />
                    <button onClick={this.onClose.bind(this)}>Close</button>
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal(),
    checkInOrOutReset: () => checkInOrOutReset(),
};

const mapStateToProps = state => ({
    data: state.modal.modalProps.data,
    checkType: state.modal.modalProps.checkType
});

export default connect( mapStateToProps, mapDispatchToProps ) ( CheckModal );

import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from 'react-redux';

import { checkInOrOutReset } from '../actions/check-in-out';
import CheckInOutTable from './check-in-out-table';
import { hideModal, showModal }  from '../actions/modal';
import Modal from './modal';
import printer from '../images/printer.png';
import '../css/check-modal.css';

export class  CheckModal extends React.Component{
    
    onClose(){
        this.props.checkInOrOutReset();
        this.props.hideModal();
    }


    render(){
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <ReactToPrint
                    trigger={() =>  <button className="check-modal-button">
                                    <img src={ printer } alt="Printer icon" className="icon"/>
                                    </button>}
                    content={() => this.componentRef }
                    closeAfterPrint={true}
                    />
                    <h1 className="check-modal-title">{ this.props.data.product }</h1>
                    <CheckInOutTable 
                        ref={el => ( this.componentRef = el )} 
                        data={ this.props.data }
                        checkType={ this.props.checkType} />
            </Modal>
        )
    }

}

const mapDispatchToProps = ({
    hideModal,
    checkInOrOutReset,
    showModal,
});

const mapStateToProps = state => ({
    data: state.modal.modalProps.data,
    checkType: state.modal.modalProps.checkType,
    user: state.auth.currentUser,
});

export default connect( mapStateToProps, mapDispatchToProps ) ( CheckModal );

import React from 'react';
import { connect } from 'react-redux';
import { hideModal }  from '../actions/modal';
import { checkInOrOutReset } from '../actions/check-in-out';
import CheckInOutTable from './check-in-out-table';
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
                    <h1>{ this.props.data.product.name }</h1>
                    <CheckInOutTable data={ this.props.data } />
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
    data: state.modal.modalProps,
});

export default connect( mapStateToProps, mapDispatchToProps ) ( CheckModal );

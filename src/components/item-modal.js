import React from 'react';
import { connect } from 'react-redux';
import { hideModal }  from '../actions/modal';
import DetailsTable from './details-table';
import Modal from './modal';
import '../css/modal-item.css';

class ItemModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    getItem(){
        let itemId = this.props.itemId;
        let myItem = {};
       
        this.props.data.forEach( item  => {
            if( item.id === itemId ){
                myItem = item;
            }
        });
        return myItem;
    }

    render(){
        let item = this.getItem();
        return(
            <Modal onClose={this.onClose.bind(this)}>
                <div className="item">
                    <h1>{ item.product.name }</h1>
                    <DetailsTable item={ item } />
                    <button>Edit</button>
                </div>
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal()
};

const mapStateToProps = state => ({
    data: state.search.data,
    itemId: state.modal.modalProps,
});

export default connect( mapStateToProps, mapDispatchToProps ) (ItemModal);

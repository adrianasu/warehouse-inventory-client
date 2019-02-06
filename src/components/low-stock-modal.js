import React from 'react';
import { connect } from 'react-redux';
import { hideModal }  from '../actions/modal';
import LowStockTable from './low-stock-table';
import Modal from './modal';

export class LowStockModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    getProduct(){
        let productId = this.props.modalProps.productId;
        let myProduct = {};

        this.props.data.forEach( product  => {
            if( product.product._id === productId ){
                myProduct = product;
            }
        });
        return myProduct;
    }

    render(){
     
        let product = this.getProduct();
        return(
            <Modal onClose={this.onClose.bind(this)}>
                    <LowStockTable data={ product } />
            </Modal>
        )
    }

}

const mapDispatchToProps = {
    hideModal: () => hideModal()
};

const mapStateToProps = state => ({
    data: state.search.data,
    modalProps: state.modal.modalProps,
});

export default connect( mapStateToProps, mapDispatchToProps ) (LowStockModal);

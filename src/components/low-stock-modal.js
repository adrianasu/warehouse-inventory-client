import React from 'react';
import { connect } from 'react-redux';
import { hideModal }  from '../actions/modal';
import LowStockTable from './low-stock-table';
import Modal from './modal';
import '../css/modal-item.css';

class LowStockModal extends React.Component{
    onClose(){
        this.props.hideModal();
    }

    getProduct(){
        let productId = this.props.productId;
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
                <div className="item">
                    <LowStockTable data={ product } />
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
    productId: state.modal.modalProps,
});

export default connect( mapStateToProps, mapDispatchToProps ) (LowStockModal);

import React from 'react';
import { connect } from 'react-redux';
import { showForm } from '../actions/show-form';

class DeleteButton extends React.Component{

    handleDelete( e ){
        e.stopPropagation();
        let dataType = this.props.modalProps.dataType;
        let itemId = this.props.modalProps.itemId;
        // show confirm-delete form 
        this.props.showForm('DELETE', {
            dataType,
            itemId
        })
    }

    render(){
        return(
                <button 
                    className="main-button"
                    data={ this.props.modalProps } 
                    onClick={ this.handleDelete.bind(this) }>
                    Delete
                </button>
        )
    }

}

const mapStateToProps = state => ({
    modalProps: state.modal.modalProps
});

const mapDispatchToProps = ({
    showForm: showForm
});

export default connect( mapStateToProps, mapDispatchToProps )( DeleteButton );
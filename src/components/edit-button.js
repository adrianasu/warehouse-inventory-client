import React from 'react';
import { connect } from 'react-redux';
import { showForm } from '../actions/show-form';

class EditButton extends React.Component{


    handleEdit( e ){
        e.stopPropagation();
        let dataType = this.props.modalProps.dataType;
        let itemId = this.props.modalProps.itemId;
        return this.props.showForm('EDIT', { dataType, itemId })
    }

    render(){
        return(
            <button 
                onClick={ this.handleEdit.bind(this) }>
                Edit
            </button>
        )
    }

}

const mapStateToProps = state => ({
    modalProps: state.modal.modalProps,
});

const mapDispatchToProps = ({
    showForm: showForm,
});

export default connect( mapStateToProps, mapDispatchToProps )( EditButton );
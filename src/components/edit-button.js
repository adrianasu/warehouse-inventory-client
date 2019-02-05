import React from 'react';
import { connect } from 'react-redux';
import { showForm } from '../actions/show-form';
import { load } from '../actions/load';
import { getItem } from '../utils/utils';

export class EditButton extends React.Component{


    handleEdit( e ){
        e.stopPropagation();
        let dataType = this.props.modalProps.dataType;
        let id = this.props.modalProps.itemId;
        let data = this.props.data;
        let itemData = getItem({ id, data });
        // Load data to pre-fill Edit form.
        this.props.load(itemData)
        // Dispatch action to show in same modal the Edit Form
        return this.props.showForm('EDIT', { dataType, id, itemData })
    }

    render(){
        return(
            <button className="main-button"
                onClick={ this.handleEdit.bind(this) }>
                Edit
            </button>
        )
    }

}

const mapStateToProps = state => ({
    data: state.search.data,
    modalProps: state.modal.modalProps,
   
});

const mapDispatchToProps = ({
    showForm,
    load
});

export default connect( mapStateToProps, mapDispatchToProps )( EditButton );
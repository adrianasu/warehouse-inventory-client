import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions/fetch-data';
import { hideForm } from '../actions/show-form';
import { hideModal, showModal } from '../actions/modal';
import { getRelatedData, capitalize } from '../utils/utils'
import { deleteOptions } from '../actions/fetch-options';

export class ConfirmDelete extends React.Component{

     componentWillUnmount() {
         // When an item has been deleted, 
         // the user will be sent back to the 
         // list, so we need to fetch our updated data.
         if (this.props.wasDeleted ||
             this.props.hasErrored ) {
             // Use last search query values
             let query = this.props.query;
             return this.props.fetchData(query)
         }
     }

    showResultMessage( dataType) {
        // If item was updated, show confirmation message
        if (this.props.wasDeleted) {
            this.props.deleteOptions();
            this.props.showModal('CONFIRM_MODAL', {
                message: `${ capitalize(dataType) } was deleted.`
            })
        // If an error occurred, let the user know
        } else if (this.props.hasErrored) {
            let modalProps = this.props.error.message;
            this.props.showModal('ERROR_MODAL', modalProps);
        }
    }

    handleDelete(){
        let dataType = this.props.dataType;
        let itemId = this.props.itemId;
        return this.props.fetchData({
             method: 'DELETE',
             itemId,
             dataType
        })
   .then(() => {
        this.showResultMessage(dataType);
       })
               
    }

    handleCancel(){
        this.props.hideForm();
    }

    displayWarning(){
        let dataType = this.props.dataType;
        let otherData = getRelatedData(dataType); 
       
        return otherData ? 
            <p>All { otherData.join(" and ") } containing that { dataType } will be deleted too.</p>
             : null;
    }
    
    render(){
        
        let dataType = this.props.dataType;
        return(
            <div>
                { this.displayWarning() }
                <p>Are you sure you want to delete this { dataType }?</p>
                <button 
                    className="main-button"
                    onClick={ this.handleDelete.bind(this) }>
                    Delete
                </button>
                <button 
                    className="main-button"
                    onClick={ this.handleCancel.bind(this) }>
                    Cancel
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dataType: state.modal.modalProps.dataType,
    error: state.search.error,
    hasErrored: state.search.error !== null,
    itemId: state.showForm.formProps.itemId,
    query: state.query.values,
    wasDeleted: state.search.data.deleted,
})

const mapDispatchToProps = ({
    deleteOptions,
    fetchData,
    hideForm,
    hideModal,
    showModal,
})

export default connect( mapStateToProps, mapDispatchToProps)( ConfirmDelete );

 

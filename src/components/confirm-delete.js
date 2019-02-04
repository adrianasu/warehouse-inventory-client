import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions/fetch-data';
import { hideForm } from '../actions/show-form';
import { hideModal, showModal } from '../actions/modal';
import { getRelatedData } from '../utils/utils'
import { deleteQueryValues } from '../actions/query-values';

class ConfirmDelete extends React.Component{

    showResultMessage(itemId, dataType) {
        // If item was updated, show confirmation message
        if (this.props.wasDeleted) {
            this.props.deleteQueryValues();
            this.props.showModal('CONFIRM_MODAL', {
                message: `${ dataType } was deleted.`
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
        this.props.hideModal();
        this.props.hideForm();
        this.showResultMessage(itemId, dataType);
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
    dataType: state.showForm.formProps.dataType,
    error: state.search.error,
    hasErrored: state.search.error !== null,
    itemId: state.showForm.formProps.itemId,
    wasDeleted: state.search.data.OK,
})

const mapDispatchToProps = ({
    deleteQueryValues,
    fetchData,
    hideForm,
    hideModal,
    showModal,
})

export default connect( mapStateToProps, mapDispatchToProps)( ConfirmDelete );

 

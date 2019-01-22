import React from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../actions/fetch-data';
import { hideForm } from '../actions/show-form';

class ConfirmDelete extends React.Component{
    handleDelete(){
        let dataType = this.props.dataType;
        let itemId = this.props.itemId;
        return this.props.fetchData({
             method: 'DELETE',
             itemId,
             dataType
        })  
               
    }

    handleCancel(){
        this.props.hideForm();
    }

    displayError(){
        return(
            <p>{ this.props.error.message }</p>
        )
    }

    displayConfirmation(){
        let dataType = this.props.dataType;
        return(
            <p>{ dataType } was deleted.</p>
        )
    }

    displayButtons(){
        let dataType = this.props.dataType;
        return(
            <React.Fragment>
                <p>Are you sure you want to delete { dataType }?</p>
                <button onClick={ this.handleDelete.bind(this) }>
                    Delete
                </button>
                <button onClick={ this.handleCancel.bind(this) }>
                    Cancel
                </button>        
            </React.Fragment>
        )
    }

    render(){
       
        return(
            <div>
                { 
                this.props.hasErrored ?
                    this.displayError()
                    : this.props.deleted ?
                        this.displayConfirmation()
                        :
                        this.displayButtons()
                }
            </div>

        );
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
    dataType: state.showForm.formProps.dataType,
    deleted: state.search.data.OK,
    error: state.search.error,
    hasErrored: state.search.error !== null,
    itemId: state.showForm.formProps.itemId,
})

const mapDispatchToProps = ({
    fetchData: fetchData,
    hideForm: hideForm,
})

export default connect( mapStateToProps, mapDispatchToProps)( ConfirmDelete );

 

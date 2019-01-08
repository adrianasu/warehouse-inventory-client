import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal';

export class ResultsTable extends React.Component{

     openModal(e) {
        let itemId = e.currentTarget.dataset.id;
        //console.log("I was clicked ", itemId);
        let modalType = 'ITEM_MODAL';
        this.props.showModal(modalType, itemId);
     }
    
    itemDescription(item){
        let list = [];
        Object.keys(item).forEach(( field ) => {
       
            if( field === "product" ){ 
                return(
                list.push(
                    <React.Fragment key={ field }>
                        <li key="name"> { `Product: ${item[field].name}` } </li>
                        <li key ="manufacturer"> { `Manufacturer: ${item[field].manufacturer.name}` } </li>
                        <li key="model"> { `Model: ${item[field].model}` } </li>
                    </React.Fragment> )
                )
            } else if( field === "isCheckedOut" ) {
                return(
                list.push(<li key={ field }> { field ? "Not available" : "Available" } </li>)
                )
            } else if( field === "location"){
                return(
                list.push(<li key="warehouse"> { `Warehouse: ${item[field].warehouse}` } </li>)
                )
            } else {
                return;
            }
        })
        return(
            <ul>{ list }</ul>
        )
    }

    makeRow(item){
        return(
            <tr key={ item.id } 
                data-id={item.id} >
                <td>
                    { this.itemDescription( item )}
                </td>
                
                <td>
                    <button onClick={ this.openModal.bind(this) }
                            key={ item.id } 
                            data-id={item.id}>
                    More
                    </button>
                </td>
            </tr>
        )
    }

    makeTable(numberOfItems){
        let items = this.props.data;
        // if "items" is an object (only one item was found)
        if(items.id && numberOfItems === undefined){
            return this.makeRow( items );
        // if "items" is an array of items
        } else if( numberOfItems > 0){
            return (items.map((item) => (
                this.makeRow(item)
            )))
        }
        return;
    }

    render(){
        let results = this.props.data;
      
        return(
            <table>
                <tbody>
                    {  results.length !== 0 ? 
                            this.makeTable(results.length)
                            : <tr></tr> }
                </tbody>
            </table>     
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.search.data
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps)),
});

export default connect( mapStateToProps, mapDispatchToProps )( ResultsTable );
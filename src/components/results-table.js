import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal';

export class ResultsTable extends React.Component{
  
    // show details of the item in a modal
     openModal(e) {
        let itemId = e.currentTarget.dataset.id;
        let modalType = 'ITEM_MODAL';
        this.props.showModal(modalType, itemId);
     }
    
    itemDescription(item){
        let list = [];
        const publicAccessLevel = 10;
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
                    // if access level is public or admin then show
                    //exact location of the item inside the warehouse
                    if (this.props.user &&
                        this.props.user.accessLevel >= publicAccessLevel) {
                            return(
                                list.push(
                                    <React.Fragment key="location">
                                        <li key="warehouse"> { `Warehouse: ${item[field].warehouse}` } </li>
                                        <li key="aisle"> {
                                            `Aisle: ${item[field].aisle}, Shelf: ${item[field].shelf}, Bin: ${item[field].bin}`
                                        } </li>
                                    </React.Fragment>
                            ))
                        } else {
                            // if access level is basic or overview only show
                            // the warehouse where the item is located
                            return(
                                list.push(<li key="warehouse"> { `Warehouse: ${item[field].warehouse}` } </li>)
                                ); 
                    }
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

    makeTable(items, numberOfItems){
        // let items = this.props.data;
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

    // filteredResults(){
    //     let searchTerm = this.props.searchTerm;
    //     let re = new RegExp(searchTerm,1)
    //     console.log("TERM ", re)
    //     let fields = ['product', 'category', 'manufacturer'];
    //     if( this.props.data 
    //         && this.props.data.length !== 0
    //         && re !== '' ){
           
    //             this.props.data.filter(item => 
    //                 Object.keys(item).forEach(key =>{
    //                   if( fields.includes( key ) ){
    //                     item[key].name = re;
    //                   } else if (key === 'location') {
    //                       item[key].warehouse = re;
    //                   } 
    //                 }
                       
    //                 )
    //                 )
    //     } else {
    //         return this.props.data;
    //     }
    // }

    render(){
        // let results = this.filteredResults();
        // let results = this.props.data;
        let results = this.props.fil;
        console.log("FILTERED ", results)
        return(
            <table>
                <tbody>
                    {  results.length !== 0 ? 
                            this.makeTable(results, results.length)
                            : <tr></tr> }
                </tbody>
            </table>     
        )
    }
}

const mapStateToProps = state => {
    return {
        // data: state.search.data,
        // searchTerm: state.filter.searchTerm,
        user: state.auth.currentUser,
    }
};

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps)),
});

export default connect( mapStateToProps, mapDispatchToProps )( ResultsTable );
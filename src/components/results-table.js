import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showModal } from '../actions/modal';
import { addSpace } from '../utils/utils.js';
import { getKeys, PUBLIC_ACCESS_LEVEL } from '../utils/list-content';


export class ResultsTable extends React.Component{

    // show details of the item in a modal
     openModal(e) {
        let itemId = e.currentTarget.dataset.id;
        let modalType = 'ITEM_MODAL';
        this.props.showModal(modalType, { itemId, dataType: 'item'  });
     }

     openLowStockModal(e){
         let productId = e.currentTarget.dataset.id;
         let modalType = 'LOW_STOCK_MODAL';
         this.props.showModal(modalType, productId);
     }
    
    itemDescription(item, idx){
        let list = [];
        let descriptionFields = ['product', 'model', 'manufacturer', 'category'];
        let noItems = ['id', 'isCheckedOut', 'location', 'minimumRequired', 'inStock', 'difference', 'usefulLife'];
    
        Object.keys(item).forEach(( field ) => {
            if( descriptionFields.includes(field) &&
                !noItems.includes(field)){ 
            
                    list.push(
                        <li key={field}>{ field }: { item[field] } </li>)
             
            
            } else if( field === "location"){
                    // if access level is public or admin then show
                    //exact location of the item inside the warehouse
                    if (this.props.user &&
                        this.props.user.accessLevel >= PUBLIC_ACCESS_LEVEL) {
                  
                                list.push(
                                    <React.Fragment key="location">
                                        <li key="warehouse"> { `Warehouse: ${item[field].warehouse}` } </li>
                                        <li key="aisle"> {
                                            `Aisle: ${item[field].aisle}, Shelf: ${item[field].shelf}, Bin: ${item[field].bin}`
                                        } </li>
                                    </React.Fragment>
                            )
                    } else {
                        // if access level is basic or overview only show
                        // the warehouse where the item is located
                  
                            list.push(<li key="warehouse"> { `Warehouse: ${item[field].warehouse}` } </li>)
                       
                    }
                } else if( field === "isCheckedOut" ) {
               
                        list.push(<li key={ field }> { item[field] ?  
                                <React.Fragment><FontAwesomeIcon icon="times-circle" /> {item.checkedOut[0].condition}</React.Fragment>
                                : <React.Fragment><FontAwesomeIcon icon="check-circle" />Available</React.Fragment>
                            } </li>)
                        
                }else if( field === 'minimumRequired' ){
               
                  
                            list.push( <li key ={field} > {
                                        `${addSpace(field)}: ${item[field]} ${item.product[field].units}`
                                    } </li>)
                             
                } else if( field === 'inStock' ){
               
                 
                            list.push( <li key = {field} > {
                                        `${addSpace(field)}: ${item[field].length} ${item.product.minimumRequired.units}`
                                    } </li>)
                            
                }  else if( field === 'difference' ){
               
               
                            list.push(<li key={field}> { `${addSpace(field)}: ${item[field]}` } </li>)
                            
                } else if (field === 'usefulLife') {

                  
                        list.push( <li key={field} > {
                            `${addSpace(field)}: ${item[field]} ${item[field] !=="NA" ? 'days' : ""}`
                        } </li>)
                    
                }
        })
   
        return(
            <ul key={idx}>{ list }</ul>
        )
    }

    makeRow(item, idx){
        // If "data" is an object of items, get each item's id. If
        // "data" is an object with products then get the product's id.
        // This id will help us to identify the element clicked and show 
        // its details in a modal.
        let id = item.id;
        let handleOnClick = this.openModal.bind(this);
        if( !item.id ){
            id = item.product._id;
            handleOnClick = this.openLowStockModal.bind(this);
        }

        return(
            <tr key={ idx } 
                data-id={id} 
                onClick = {
                    handleOnClick
                } >
                <td>
                    { this.itemDescription( item, idx )}
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
            return (items.map((item, idx) => (
                this.makeRow(item, idx)
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
        let results = this.props.currData;
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
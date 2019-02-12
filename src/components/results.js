import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../actions/modal';
import { addSpace } from '../utils/utils.js';
import { PUBLIC_ACCESS_LEVEL } from '../utils/list-content';
import '../css/results-table.css';
import checkIcon from '../images/green-check.png';
import closeIcon from '../images/red-cross.png';

export class Results extends React.Component{

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
        const location = ['bin', 'shelf', 'aisle'];
        const noDescription =  ['id', 'checkedIn', 'checkedOut', 'registeredDate', 'registeredCondition', '']
    
        Object.keys(item).forEach(( field ) => {
            // If access level is public or admin then show
            // exact location of the item inside the warehouse,
            // otherwise show only the warehouse where is located.
           if( location.includes(field)
                && (this.props.user &&
                this.props.user.accessLevel < PUBLIC_ACCESS_LEVEL) ){
                return;
            } else if( field === "isCheckedOut" ) {
                list.push(<li key={ field }> { item[field] ?  
                        <React.Fragment><img src={ closeIcon } alt="close icon" className="icon"/> {item.checkedOut[0].condition}</React.Fragment>
                        : <React.Fragment><img src={ checkIcon } alt="check icon" className="icon"/>Available</React.Fragment>
                    } </li>)
                } else if( field === 'inStock' ){
                            list.push( <li key = {field} > {
                                        `${addSpace(field)}: ${item[field].length} ${item.product.minimumRequired.units}`
                                    } </li>)
                
                } else if (field === 'usefulLife') {
                        list.push( <li key={field} > {
                            `${addSpace(field)}: ${item[field]} ${item[field] !=="NA" ? 'days' : ""}`
                        } </li>)
                    
                } else if ( field === 'product' ){
                    list.push(<li key={field}> { item[field] } </li>)
                } else if ( !noDescription.includes(field) ){
                    list.push(
                        <li key={field}>{ addSpace(field) }: { item[field] } </li>)
                }
        })
   
        return(
            <ul key={idx}>{ list }</ul>
        )
    }

    generateDescription(item, idx){
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
            <div key={ idx } 
                data-id={id} 
                onClick={handleOnClick}
                className="item" >
             
                    { this.itemDescription( item, idx )}
             
            </div>
        )
    }

    generateResults(items, numberOfItems){
        // if "items" is an object (only one item was found)
        if(items.id && numberOfItems === undefined){
            return this.generateDescription( items );
        // if "items" is an array of items
        } else if( numberOfItems > 0){
            return (items.map((item, idx) => (
                this.generateDescription(item, idx)
            )))
        }
        return;
    }


    render(){
   
        let results = this.props.currData;
        return(
            <div className="results-container">
            {  results.length !== 0 ? 
                    this.generateResults(results, results.length)
                    : null }
             
            </div>     
        )
    }
}

const mapStateToProps = state => ({
        user: state.auth.currentUser,
});

const mapDispatchToProps = ({
    showModal,
});

export default connect( mapStateToProps, mapDispatchToProps )( Results );
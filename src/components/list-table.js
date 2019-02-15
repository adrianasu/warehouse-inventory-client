import React from 'react';
import { connect } from 'react-redux';

import { addSpace, accessLevelToString } from '../utils/utils';
import { getKeys } from '../utils/list-content';
import { showModal } from '../actions/modal';
import '../css/list-table.css';
import checkIcon from '../images/check.png';
import closeIcon from '../images/close.png';
import moreIcon from '../images/more.png';

export class ListTable extends React.Component{
    // show details of the item in a modal
    openModal(e) {
        let itemId = e.currentTarget.dataset.id; 
        let dataType = this.props.reportType;
        let modalType = 'ITEM_MODAL';
        
        this.props.showModal(modalType, { itemId, dataType });
    }

    openLowStockModal(e) {
        let productId = e.currentTarget.dataset.id;
        let modalType = 'LOW_STOCK_MODAL';
        this.props.showModal(modalType, {
            productId,
            dataType: 'low-stock'
        });
    }

    whoCheckedItOut(item, isItem) {
        // If item is checked out send the name and Id of the
        // employee who has it.
        return item && item.isCheckedOut && isItem ?
            `Ckecked out by: ${item.checkedOut[0].employee.firstName} ${item.checkedOut[0].employee.lastName}, ID: ${item.checkedOut[0].employee.employeeId}` 
            : item && item.isCheckedOut ? 
                `${item.checkedOut[0].employee.firstName} ${item.checkedOut[0].employee.lastName}, ID: ${item.checkedOut[0].employee.employeeId}`
                : ""
    }

    whereIsIt( item ){
        // If item is not checked out send its location
        return item && item.isCheckedOut ?
             ""
            :`Warehouse: ${item.warehouse || "NA"}, aisle: ${item.aisle || "NA"}, shelf: ${item.shelf || "NA"}, bin: ${item.bin|| "NA"}`
    }

    isAvailableIcon(item){
        return item && item.isCheckedOut ?
            <img src={ closeIcon } alt="close icon" className="icon"/>
            : <img src={ checkIcon } alt="check icon" className="icon"/>;
    }

    generateRow( item, titles ){
        let row = [];
        titles.forEach( title => {
            // Low Stock report sends product as an object
            if( title === 'product' && 
                titles.includes('shortfall')) {
                row.push(<td  key = {title}>{ `${item.product.name}, mod. ${item.product.model}, manuf. ${item.product.manufacturer.name}` }</td>);
            // Product list
            } else if( title === 'product' ||
                ( title === 'item' &&
                    titles.includes('checked-out by') )){
                row.push(<td  key = {title}>{ `${item.name}, mod. ${item.model}, manuf. ${item.manufacturer}` }</td>);
            // Item sends product serialized
            } else if (title === 'item' &&
                ( titles.includes('location') ||
                titles.includes('usefulLife') )){
                row.push(<td  key = {title}>
                    { `${item.product}, mod. ${item.model}, manuf. ${item.manufacturer }, ` }
                </td>);
            } else if (title === 'item' ) {
                row.push(<td  key = {title}>
                    { this.isAvailableIcon(item) }
                    { `${item.product}, mod. ${item.model}, manuf. ${item.manufacturer }, ` }
                    { this.whereIsIt(item) }
                    { this.whoCheckedItOut(item, 'item') }
                </td>);
            }else if( title === 'consummable' ){
               row.push( <td key ={title} > {
                                item[title] ? 
                            <img src={ checkIcon } alt="check icon" className="icon"/>
                            : <img src={ closeIcon } alt="close icon" className="icon"/>
                            } </td>);
            } else if( title === 'checked-out by' ){
               row.push( <td key ={title} > { this.whoCheckedItOut(item) } </td>);
            } else if( title === 'location' ){
               row.push( <td key ={title} > { this.whereIsIt(item) } </td>);
            } else if (title === 'usefulLife') {
                row.push( <td key={title} > {
                            `${item[title]} ${item[title] !=="NA" ? 'days' : ""}`
                        } </td>)
            }else if( title === 'accessLevel' ){
                row.push(<td key={title}>{ accessLevelToString(item.accessLevel) }</td>);
            } else if( title === 'quantity' ){
                row.push(<td key={title}>{ item.items.length }</td>);
            } else {
                row.push( <td key={title} > { item[title] } </td>)
            }
        })
            row.push( <td key="more">
                    <img src={ moreIcon } alt="more icon" className="more-icon"/>
                 </td>)
        return row;
    }

    generateBody( data, titles, reportType ){
        // If "data" is an object of items, get each item's id. If
        // "data" is an object with products then get the product's id.
        // This id will help us to identify the element clicked and show 
        // its details in a modal.
        let body = [];
        data.forEach( (item, key) => {
            let id = item.id;
            let handleOnClick = this.openModal.bind(this);
            if (reportType === 'low-stock') {
                id = item.product._id;
                handleOnClick = this.openLowStockModal.bind(this);
            }
            body.push(<tr 
                        key={ key } 
                        data-id={ id } 
                        onClick={ handleOnClick }>
                        { this.generateRow(item, titles) }
                     </tr>);
        })
        return body;
    }

    generateHeader( titles ){
        let header =[];
        titles.forEach( title => {
            title === 'isCheckedOut' ?
                header.push(<th key={title}>Available</th>)
                : header.push(<th key={title}>{ addSpace(title) }</th>)
        })
        header.push(<th key="more"></th>)
        return header;
    }
    
    makeTable(results){
        let table = [];
        let reportType = this.props.reportType;
        let titles = getKeys(reportType);
        table.push( <tr key="header">{ this.generateHeader( titles ) }</tr>);
        table.push( this.generateBody( results, titles, reportType ));
        return  table;
    }

    render(){
        let results = this.props.currData;
        return(
            <table className="results-table">
                <tbody>
                    { results.length !== 0 ? this.makeTable(results) : null }
                </tbody>
            </table>
        )
    }

}

const mapDispatchToProps = ({
    showModal
})

export default connect(null, mapDispatchToProps) ( ListTable );
import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addSpace, accessLevelToString } from '../utils/utils';
import { getKeys } from '../utils/list-content';
import { showModal } from '../actions/modal';
import '../css/list-table.css';

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

    generateRow( item, titles ){
        let row = [];
        titles.forEach( title => {
            // Low Stock report sends product as an object
            if( title === 'product' && 
                titles.includes('shortfall')) {
                row.push(<td  key = {title}>{ `${item.product.name}, mod. ${item.product.model}, manuf. ${item.product.manufacturer.name}` }</td>);
            } else if( title === 'product' && 
                titles.includes('consummable')) {
                row.push(<td  key = {title}>{ `${item.name}, mod. ${item.model}, manuf. ${item.manufacturer.name}` }</td>);
            } else if (title === 'product' ) {
                row.push(<td  key = {title}>{ `${item.product}, mod. ${item.model}, manuf. ${item.manufacturer}` }</td>);
            } else if( title === 'location' ){
                row.push(<td  key = {title}>{ item.warehouse }</td>);
            } else if( title === 'consummable' ){
               row.push( <td key ={title} > {
                                item[title] ? 
                                <FontAwesomeIcon icon={ ['far', 'check'] } />
                                : <FontAwesomeIcon icon='times'/> 
                            } </td>);
            } else if (title === 'usefulLife') {
                row.push( <td key={title} > {
                            `${item[title]} ${item[title] !=="NA" ? 'days' : ""}`
                        } </td>)
            } else if (title === 'isCheckedOut') {
                // This column header is "Available"
                row.push( <td key={title} > {
                            item[title] === true ? 
                            <FontAwesomeIcon icon='times'/> 
                            : <FontAwesomeIcon icon={ ['far', 'check'] }/>
                        } </td>)
            
            }else if( title === 'accessLevel' ){
                row.push(<td key={title}>{ accessLevelToString(item.accessLevel) }</td>);
            } else {
                row.push( <td key={title} > { item[title] } </td>)
            }
        })
            row.push( <td key="more">
                    <FontAwesomeIcon icon={ ['far', 'ellipsis-v'] }/>
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
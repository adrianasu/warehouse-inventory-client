import React from 'react';
import { connect } from 'react-redux';

import { formatDate } from '../utils/utils';
import '../css/account-results.css';

export class AccountResults extends React.Component{

    generateItemsList(items){
        return items.map( (item, key) => (
                <React.Fragment key={key}>
                    <li key={key}>
                        <ul>
                            <li key='barcode'>Barcode: { item.barcode }</li>
                            <li key='prod'>Product: { item.product.name }</li>
                            <li key='man'>Manufacturer: { item.product.manufacturer.name }</li>
                            <li key='mod'>Model: { item.product.model }</li>
                            <li key='sn'>Serial Number: { item.serialNumber }</li>
                            <li key='date'>Checked-Out Date: { formatDate(item.checkedOut[0].date) }</li>
                        </ul>
                    </li>
                </React.Fragment>
        ))
    }

    listItems(items){
        if( items && items.length > 0 ){
            return (
                <div>
                    <h3>Checked-Out Items: { items.length }</h3>
                    <ol>
                        { this.generateItemsList(items)}
                    </ol>
                </div>
            )
        }
        return <p>No checked-out items.</p>;
    }

   
    render(){
        let employee = this.props.account.employee;
        let name = `${ employee.firstName } ${ employee.lastName }`;
        let items = this.listItems(this.props.account.items);
        return(
            <div>
                <h2>{ name }</h2>
                    <p>Employee ID: { employee.employeeId }</p>
                    <p>{ formatDate(Date.now()) }</p>
                        { items }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    account: state.account.data,
})

export default connect( mapStateToProps )( AccountResults );
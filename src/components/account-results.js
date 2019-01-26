import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/utils';

export class AccountResults extends React.Component{

    generateItemsList(items){
        return items.map( item => (
                <React.Fragment key={item}>
                    <li key={item}>
                        <ul className='list item'>
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
                <div className='checked-out list'>
                    <h2>Checked-Out Items: { items.length }</h2>
                    <ol>
                        { this.generateItemsList(items)}
                    </ol>
                </div>
            )
        }
        return <p>No checked-out items.</p>;
    }

   
    render(){
        let employee = this.props.data.employee;
        let name = `${ employee.firstName } ${ employee.lastName }`;
        let items = this.listItems(this.props.data.items);
        return(
            <div>
                <h1>{ name }</h1>
                    <p>Employee ID: { employee.employeeId }</p>
                    <p>{ formatDate(Date.now()) }</p>
                        { items }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
})

export default connect( mapStateToProps )( AccountResults );
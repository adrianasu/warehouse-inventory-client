import React from 'react';
import { connect } from 'react-redux';

class Account extends React.Component{

    getDate(d = new Date()) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let mm = months[d.getMonth()];
        let dd = d.getDate();
        let yyyy = d.getFullYear();
        let hh = d.getHours();
        let min = d.getMinutes() < 10 ? '0'+ d.getMinutes() : d.getMinutes();
        let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

        return `${mm} ${dd} ${yyyy}, ${hh}:${min}:${sec}`
    }

    generateItemsList(items){
        return items.map( item => (
                <React.Fragment key={item}>
                    <li key={item}>
                        <ul>
                            <li key='barcode'>Barcode: { item.barcode }</li>
                            <li key='prod'>Product: { item.product.name }</li>
                            <li key='man'>Manufacturer: { item.product.manufacturer.name }</li>
                            <li key='mod'>Model: { item.product.model }</li>
                            <li key='date'>Checked-Out Date: { this.getDate(new Date(item.checkedOut[0].date)) }</li>
                            <li key='sn'>Serial Number: { item.serialNumber }</li>
                        </ul>
                    </li>
                </React.Fragment>
        ))
    }

    listItems(items){
        if( items && items.length > 0 ){
            return (
                <div>
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
                    <p>{ this.getDate() }</p>
                        { items }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
})

export default connect( mapStateToProps )( Account );
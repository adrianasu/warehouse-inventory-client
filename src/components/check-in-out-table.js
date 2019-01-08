import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CheckInOutTable( props ){
    console.log(props);
    let data = props.data;
    
    return(
            <table>
                <tbody>
                {/* <tr>
                    <td>Barcode</td>
                    <td>{ props.checkedOut[0].barcode }</td>
                </tr> */}
                <tr>
                    <td>Employee ID</td>
                    < td > 
                        {`${ data.checkedOut[0].employee.firstName } ${ data.checkedOut[0].employee.lastName }`}
                    </td>
                </tr>
                <tr>
                    <td>Item</td>
                    <td>{ data.product.name }</td>
                </tr>
                <tr>
                    <td>Warehouse</td>
                    <td>{ data.location.warehouse }</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{ data.checkedOut[0].date }</td>
                </tr>
                <tr>
                    <td>Condition</td>
                    <td>{ data.checkedOut[0].condition }</td>
                </tr>
                {/* <tr>
                    <td>Authorized by</td>
                    <td>{ data.checkedOut[0].user }</td>
                </tr> */}
                </tbody>
            </table>
    )

}

export default connect() (CheckInOutTable);
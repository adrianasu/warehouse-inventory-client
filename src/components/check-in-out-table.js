import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/utils.js'

import '../css/check-in-out-table.css';

function CheckInOutTable( props ){
    // If we're doing check-out get data from the last
    // check-out transaction
    let transaction = "Check-Out";
    let checkData = props.data.data.checkedOut[0];
    // If we're doing check-in, then get data from 
    // last check-in transaction.
    if( props.data.checkType === "checkIn" ){
        checkData = props.data.data.checkedIn[0];
        transaction = "Check-In";
    }
       
    return(
        <div className="check-in-out">
            <table>
                <tbody>
                <tr>
                    <th colSpan={2}>{ transaction }</th>
                </tr>
                <tr>
                    <td>Item Barcode</td>
                    <td>{ props.data.data.barcode }</td>
                </tr>
                <tr>
                    <td>Employee</td>
                    <td> 
                        {`${ checkData.employee.firstName } ${ checkData.employee.lastName }`}
                    </td>
                </tr>
                <tr>
                    <td>Item</td>
                    <td>{ props.data.data.product }</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td> {
                        formatDate(checkData.date)
                    } </td>
                </tr>
              
                { props.data.checkType === "checkOut" ? 
                    <tr>
                    <td>Condition</td>
                    <td>{ checkData.condition }</td>
                     </tr>
                     : null
                 }
                <tr>
                    <td>Authorized by</td>
                    < td > {
                        checkData.authorizedBy.firstName
                    } {
                        checkData.authorizedBy.lastName
                    } </td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default connect() (CheckInOutTable);
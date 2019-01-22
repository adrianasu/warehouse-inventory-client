import React from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/utils.js'


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
            <table>
                <tbody>
                <tr>
                    <th colSpan={2}>{ transaction }</th>
                </tr>
                <tr>
                    <td>Item ID</td>
                    <td>{ props.data.data.id }</td>
                </tr>
                <tr>
                    <td>Employee ID</td>
                    <td> 
                        {`${ checkData.employee.firstName } ${ checkData.employee.lastName }`}
                    </td>
                </tr>
                <tr>
                    <td>Item</td>
                    <td>{ props.data.data.product.name }</td>
                </tr>
                <tr>
                    <td>Warehouse</td>
                    <td>{ props.data.data.location.warehouse }</td>
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
                {/* <tr>
                    <td>Authorized by</td>
                    <td>{ checkData.user }</td>
                </tr> */}
                </tbody>
            </table>
    )

}

export default connect() (CheckInOutTable);
import React from 'react';
import { formatDate, addSpace } from '../utils/utils.js'


export default function CheckInOutTable( props ){
    let item = props.data.data;
    // If we're doing check-out get data from the last
    // check-out transaction
    let checkData = props.data.data.checkedOut[0];
    // If we're doing check-in, then get data from 
    // last check-in transaction.
    if( props.data.checkType === "checkIn" ){
        checkData = props.data.data.checkedIn[0];
    }
       
    return(
            <table>
                <tbody>
                <tr>
                    <th colSpan={2}>{ addSpace(props.data.checkType) }</th>
                </tr>
                <tr>
                    <td>Item Barcode</td>
                    <td>{ item.barcode }</td>
                </tr>
                <tr>
                    <td>Employee</td>
                    <td> 
                        {`${ checkData.employee.firstName } ${ checkData.employee.lastName }`}
                    </td>
                </tr>
                <tr>
                    <td>Item</td>
                    <td>{ item.product }</td>
                </tr>
                <tr>
                    <td>Warehouse</td>
                    <td>{ item.warehouse }</td>
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
                    <td>{ checkData.authorizedBy.firstName } { checkData.authorizedBy.lastName }</td>
                </tr>
                </tbody>
            </table>
    )

}

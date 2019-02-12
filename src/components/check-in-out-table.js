import React from 'react';
import { formatDate, addSpace } from '../utils/utils.js'

import '../css/check-in-out-table.css';

export default class CheckInOutTable extends React.Component{
    render(){
        // If we're doing check-out get data from the last
        // check-out transaction
        let checkData = this.props.data.checkedOut[0];
        // If we're doing check-in, then get data from 
        // last check-in transaction.
        if( this.props.checkType === "checkIn" ){
            checkData = this.props.data.checkedIn[0];
        }
        
        return(
            <div className="check-in-out">
                <table>
                    <tbody>
                    <tr>
                        <th colSpan={2}>{ addSpace(this.props.checkType) }</th>
                    </tr>
                    <tr>
                        <td>Barcode</td>
                        <td>{ this.props.data.barcode }</td>
                    </tr>
                    <tr>
                        <td>Employee</td>
                        <td> 
                            {`${ checkData.employee.firstName } ${ checkData.employee.lastName }`}
                        </td>
                    </tr>
                    <tr>
                        <td>Item</td>
                        <td>{ this.props.data.product }</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td> {
                            formatDate(checkData.date)
                        } </td>
                    </tr>
                
                    { this.props.checkType === "checkOut" ? 
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
}

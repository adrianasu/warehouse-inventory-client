import React from 'react';
import { connect } from 'react-redux';
import { addSpace, formatDate, getItem, accessLevelToString } from '../utils/utils';
import { PUBLIC_ACCESS_LEVEL, ADMIN_ACCESS_LEVEL } from '../utils/list-content';
import DeleteButton from './delete-button';
import EditButton from './edit-button';
import '../css/edit-delete-button.css';
import redCross from '../images/red-cross.png';
import greenCheck from '../images/green-check.png';

export class ModalContent extends React.Component{

    generateTable(item){
        let list = [];
        const location = ['bin', 'shelf', 'aisle'];
        // Runs through all the keys coming from the server response.
        Object.keys(item).forEach(( field ) => {
            // If access level is public or admin then show
            // exact location of the item inside the warehouse,
            // otherwise show only the warehouse where is located.
           if( (location.includes(field)
                && (this.props.user &&
                this.props.user.accessLevel < PUBLIC_ACCESS_LEVEL) )
                || field === "id" ){
                return;
            // If item was checked in display date and name of the
            // person responsible for the return of the item.
            }else if( field === "checkedIn" ) {
                if(!item.isCheckedOut){
                    list.push(
                        <tr key={ field }> 
                            <td>Checked-in by:</td>
                            <td>{
                                item.checkedIn[0].employee.firstName
                            } {
                                item.checkedIn[0].employee.lastName
                            } ID: {
                                item.checkedIn[0].employee.employeeId
                            }
                            </td>
                        </tr>);
                    
                list.push(
                    <tr key="check-in-date">  
                        <td>Checked-in date:</td>
                        <td>{ item.checkedIn[0].date }</td>
                    </tr>
                );
            }
            // If item is checked out display date and name of the
            // person responsible for the item.
            } else if( field === "checkedOut" ) {
                if(item.isCheckedOut){
                    list.push(
                        <tr key={ field }> 
                            <td>Checked-out by:</td>
                            <td>{
                                item.checkedOut[0].employee.firstName
                            } {
                                item.checkedOut[0].employee.lastName
                            } ID: {
                                item.checkedOut[0].employee.employeeId
                            }
                            </td>
                        </tr>);
                    
                list.push(
                    <tr key="check-out-date">  
                        <td>Checked-out date:</td>
                        <td>{ item.checkedOut[0].date }</td>
                    </tr>
                );
            }
            } else if( field === 'isCheckedOut'){
                list.push(<tr key="icon" className="big">{ item[field] ?  
                            <React.Fragment>
                                <td></td>
                                <td><img src={ redCross } alt="Reject icon" className="icon"/>{item.checkedOut[0].condition}</td>
                            </React.Fragment>
                            : <React.Fragment>
                                <td></td>
                                <td><img src={ greenCheck } alt="check icon" className="icon"/>Available</td>
                            </React.Fragment>
                    }</tr>);
            } else if( field === 'inStock' ){
                list.push( <tr key={field} >
                            <td>{addSpace(field)}:</td>
                            <td>{item[field].length} {item.product.minimumRequired.units}</td>
                        } </tr>)                            
            } else if (field === 'usefulLife') {
                list.push( <tr key={field} > 
                    <td>{addSpace(field)}:</td>
                    <td>{item[field]} {item[field] !=="NA" ? 'days' : ""}</td>
                 </tr>)
            } else if( field === 'registeredDate' ){
                list.push(<tr key={field}>
                        <td>{addSpace(field)}:</td> 
                        <td>{ formatDate(item[field]) }</td>
                    </tr>)
            } else if( field === 'accessLevel' ){
                list.push(<tr key={field}>
                        <td>{addSpace(field)}:</td> 
                        <td>{ accessLevelToString(item[field]) }</td>
                    </tr>)
            } else if( field === 'consummable' ){
                list.push( <tr key ={field} > 
                        <td>{field}:</td> 
                        <td>{ item[field] ? 'yes':'no' } </td>
                    </tr>);
            }  else if( field === 'product' ){
                list.push(<tr key={field}>
                        <th colSpan="2">{ item[field] } </th>
                    </tr>)
            } else if( field === 'items' ){
                list.push(<tr key={field}>
                    <td>Quantity:</td> 
                    <td>{ item[field].length } </td>
                </tr>)
            } else {
                list.push(<tr key={field}>
                        <td>{ addSpace(field) }:</td> 
                        <td>{ item[field] } </td>
                    </tr>)
            }
        })
   
        return(
            <table key={item.id}>
                <tbody>
                    { list }
                </tbody>
            </table>
        )
    }

    render(){
        let id = this.props.itemId;
        let data = this.props.data;
        let item = getItem({ id, data });
        // Edit and Delete buttons will be available 
        // through the 'Manage' menu, not through the 'Report' menu.
        // 'low-stock' is not included in the Report menu since
        // it has its own modal.
        let reportMenu =['useful-life', 'checked-out', 'on-shelf'];
        let dataType = this.props.dataType;
   
        return(
            <div>
                { this.generateTable( item ) }
                 {
                    ((this.props.user &&
                    this.props.user.accessLevel >= PUBLIC_ACCESS_LEVEL)
                     && !reportMenu.includes(dataType)) ?
                        <EditButton /> : null
                }
                {
                    ((this.props.user && 
                    this.props.user.accessLevel >= ADMIN_ACCESS_LEVEL)
                    && !reportMenu.includes(dataType)) ?
                        <DeleteButton /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.search.data,
    itemId: state.modal.modalProps.itemId,
    dataType: state.modal.modalProps.dataType,
    user: state.auth.currentUser,
})

export default connect(mapStateToProps) (ModalContent);
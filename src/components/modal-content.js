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

    generateList(item){
        let list = [];
        const location = ['bin', 'shelf', 'aisle'];
    
        Object.keys(item).forEach(( field ) => {
            // If access level is public or admin then show
            // exact location of the item inside the warehouse,
            // otherwise show only the warehouse where is located.
           if( (location.includes(field)
                && (this.props.user &&
                this.props.user.accessLevel < PUBLIC_ACCESS_LEVEL) )|| field === "id" ){
                return;
            } else if( field === "isCheckedOut" ) {
                list.push(<li key={ field }> { item[field] ?  
                            `Checked-out by: ${
                                item.checkedOut[0].employee.firstName
                            } ${
                                item.checkedOut[0].employee.lastName
                            } ID: ${
                                item.checkedOut[0].employee.employeeId
                            }`
                            : null
                    } </li>); 
                list.push(<li key="icon" className="big"> { item[field] ?  
                            <React.Fragment><img src={ redCross } alt="Reject icon" className="icon"/>{item.checkedOut[0].condition}</React.Fragment>
                            : <React.Fragment><img src={ greenCheck } alt="check icon" className="icon"/>Available</React.Fragment>
                    } </li>);
            } else if( field === 'inStock' ){
                list.push( <li key = {field} > {
                            `${addSpace(field)}: ${item[field].length} ${item.product.minimumRequired.units}`
                        } </li>)                            
            } else if (field === 'usefulLife') {
                list.push( <li key={field} > {
                    `${addSpace(field)}: ${item[field]} ${item[field] !=="NA" ? 'days' : ""}`
                } </li>)
            }  else if( field === 'checkedIn' || field === 'checkedOut' ){
                // Show date of last time it was checkedIn or checkedOut
                list.push(<li key={field +"date"}>Last time {addSpace(field)}: { item[field].length > 0 ? formatDate(item[field][0].date) : 'never'}</li>)
                list.push(<li key={field +"person"}>{addSpace(field)} by: { item[field].length > 0 ? `${ item[field][0].employee.firstName } ${ item[field][0].employee.lastName }` : "-" }</li>)
            }  else if( field === 'registeredDate' ){
                list.push(<li key={field}>{addSpace(field)}: { formatDate(item[field]) }</li>)
            } else if( field === 'accessLevel' ){
                list.push(<li key={field}>{addSpace(field)}: { accessLevelToString(item[field]) }</li>)
            } else if( field === 'consummable' ){
                list.push( <li key ={field} > {field}: { item[field] ? 'yes':'no' } </li>);
            }  else if( field === 'product' ){
                list.push(<li key={field}>{ item[field] } </li>)
            } else if( field === 'items' ){
                list.push(<li key={field}>Quantity: { item[field].length } </li>)
            } else {
                list.push(<li key={field}>{ addSpace(field) }: { item[field] } </li>)
            }
        })
   
        return(
            <ul key={item.id}>{ list }</ul>
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
                { this.generateList( item ) }
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
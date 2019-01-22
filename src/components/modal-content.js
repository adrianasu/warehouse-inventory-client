import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addSpace, formatDate } from '../utils/utils';
import { getDetailKeys, PUBLIC_ACCESS_LEVEL, ADMIN_ACCESS_LEVEL } from '../utils/list-content';
import DeleteButton from './delete-button';
import EditButton from './edit-button';


class ModalContent extends React.Component{

    generateList(item){
        let dataType = this.props.dataType;
        let detailKeys = getDetailKeys( dataType );
        let list = [];
       
        detailKeys.forEach( key => {
            if( key === 'consummable' ){
                list.push(<li key={key}>{ key }: { item[key]? 'yes': 'no'}</li>)
            } else if( key === 'checkedIn' || key === 'checkedOut' ){
                // Show date of last time it was checkedIn or checkedOut
                list.push(<li key={key}>Last time {addSpace(key)}: { item[key].length > 0 ? formatDate(item[key][0].date) : 'never'}</li>)
            } else if( key === 'inStock' ){
                list.push( <li key = {key} > {addSpace(key)}: {
                                `${item[key].length} ${item.product.minimumRequired.units}`
                        } </li>)
            } else if (key === 'usefulLife') {
                list.push( <li key={key} > {addSpace(key)}:{
                            `${item[key]} ${item[key] !=="NA" ? 'days' : ""}`
                        } </li>)
            } else if (key === 'isCheckedOut') {
                list.push( <li key={key} >Available: {
                            item[key] === true ? 'no' : 'yes'
                        } </li>)
            }
            else if ( key === 'registered'){
                list.push(<li key={ key }>Registered: { formatDate(item[key].date) }</li>)
            } else if( key === 'location'){
                // if access level is public or admin then show
                //exact location of the item inside the warehouse
                if (this.props.user &&
                    this.props.user.accessLevel >= PUBLIC_ACCESS_LEVEL) {
                   
                            list.push(
                                <React.Fragment key="location">
                                    <li key="warehouse"> { `Warehouse: ${item[key].warehouse}` } </li>
                                    <li key="aisle"> {
                                        `Aisle: ${item[key].aisle}, Shelf: ${item[key].shelf}, Bin: ${item[key].bin}`
                                    } </li>
                                </React.Fragment>
                        )
                        } else {
                            // if access level is basic or overview only show
                            // the warehouse where the item is located
                                list.push(<li key="warehouse"> { `Warehouse: ${item[key].warehouse}` } </li>)  
                        }
            } else if( key === "isCheckedOut" ) { 
                list.push(<li key={ key }> { item[key] ?  
                    <React.Fragment><FontAwesomeIcon icon="times-circle" /> {item.checkedOut[0].condition}</React.Fragment>
                    : <React.Fragment><FontAwesomeIcon icon="check-circle" />Available</React.Fragment>
                } </li>)
            } else if( key === 'minimumRequired' ){
                list.push( <li key ={key}>{ addSpace(key) }: {item[key].quantity} {item[key].units}</li>);
            } else if( dataType === 'user' && key === 'employeeId' ){
                list.push( <li key ={key}>{ addSpace(key) }: {item.employee[key]}</li>);
            } else {
                list.push(<li key={key}>{ addSpace(key) }: { item[key] }</li>)
            }
        })
        return list;
    }

    getItem() {
        let itemId = this.props.itemId;
        let myItem = {};

        this.props.data.forEach(item => {
            if (item.id === itemId) {
                myItem = item;
            }
        });
        return myItem;
    }

    render(){
        let item = this.getItem();
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
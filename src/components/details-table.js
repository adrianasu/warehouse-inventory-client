import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DetailsTable( props ){
    console.log(props);
    return(
            <table>
                <tbody>
                <tr>
                    <td>{ props.item.isCheckedOut ? props.item.checkedOut.condition : "Available" }</td>
                    <td>{ props.item.isCheckedOut ? <FontAwesomeIcon icon="times-circle" /> : <FontAwesomeIcon icon="check-circle" />}</td>
                </tr>
                <tr>
                    <td>Category</td>
                    <td>{ props.item.product.category.name }</td>
                </tr>
                <tr>
                    <td>Manufacturer</td>
                    <td>{ props.item.product.manufacturer.name }</td>
                </tr>
                <tr>
                    <td>Model</td>
                    <td>{ props.item.product.model }</td>
                </tr>
                <tr>
                    <td>Warehouse</td>
                    <td>{ props.item.location.warehouse }</td>
                </tr>
                <tr>
                    <td>Aisle</td>
                    <td>{ props.item.location.aisle }</td>
                </tr>
                <tr>
                    <td>Shelf</td>
                    <td>{ props.item.location.shelf }</td>
                </tr>
                <tr>
                    <td>Bin</td>
                    <td>{ props.item.location.bin }</td>
                </tr>
                <tr>
                    <td>Serial Number</td>
                    <td>{ props.item.serialNumber }</td>
                </tr>
                 <tr>
                    <td>Consummable</td>
                    <td>{ props.item.product.consummable ? "yes" : "no" }</td>
                </tr>
                <tr>
                    <td>Minimum Required</td>
                    <td>{ props.item.product.minimumRequired.quantity } { props.item.product.minimumRequired.units }</td>
                </tr>
                </tbody>
            </table>
    )

}

export default connect() (DetailsTable);
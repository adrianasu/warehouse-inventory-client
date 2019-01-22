import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../utils/utils';

function LowStockTable( props ){

    let product = props.data.product;
    return(
        <div>
            <h1>{ product.name }</h1>
            <table>
                <tbody>
                <tr>
                    <td>Category</td>
                    <td>{ product.category.name }</td>
                </tr>
                <tr>
                    <td>Manufacturer</td>
                    <td>{ product.manufacturer.name }</td>
                </tr>
                <tr>
                    <td>Model</td>
                    <td>{ product.model }</td>
                </tr>
                <tr>
                    <td>In Stock</td>
                    <td>{ props.data.inStock.length }</td>
                </tr>
                <tr>
                    <td>Minimum Required</td>
                    <td>{ props.data.minimumRequired } </td>
                </tr>
                <tr>
                    <td>Difference</td>
                    <td>{ props.data.difference }</td>
                </tr>
                <tr>
                    <td>Units</td>
                    <td>{ product.minimumRequired.units }</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>{ formatDate() }</td>
                </tr>
                
                </tbody>
            </table>
        </div>
    )

}

export default connect() (LowStockTable);
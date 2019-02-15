import React from 'react';
import { formatDate } from '../utils/utils';
import '../css/low-stock-table.css';

export function LowStockTable( props ){

    let product = props.data.product;
    return(
        <div className="low-stock-table">
            <table>
                <th colSpan={2}>{ product.name }</th>
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
                    <td>Shortfall</td>
                    <td>{ props.data.shortfall }</td>
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

export default LowStockTable;
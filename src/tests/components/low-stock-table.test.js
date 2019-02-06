import React from 'react';
import { shallow } from 'enzyme';
import { LowStockTable }  from '../../components/low-stock-table';


const data = { 
    product :{
        _id: 1234,
        name: 'hammer',
        category: { name: 'tools' },
        manufacturer: { name: 'truper' },
        model: 'abc12',
        minimumRequired: { units: 'pieces' }
    },
    shortfall: 2,
    inStock: [],
    minimumRequired: 2,
};

describe('<LowStockTable />', () => {

    it('Renders without crashing', () => {
        shallow(<LowStockTable 
            data={ data }/>)
   });

});
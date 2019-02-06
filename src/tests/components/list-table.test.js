import React from 'react';
import { shallow } from 'enzyme';
import {ListTable}  from '../../components/list-table';

const data = [{ 
    id: 123,
    product: 'item'
}];

describe('<ListTable />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ListTable 
                    currData={ data }
                    reportType={ 'on-shelf' }/>);
   });

});
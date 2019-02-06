import React from 'react';
import { shallow } from 'enzyme';
import {Select}  from '../../components/select';

describe('<Select />', () => {
    
    it('Renders without crashing', () => {
        const label = 'Item';
        const input = { name: 'item'}
        const meta = { touched: false, error: null }
        shallow(<Select 
                meta={ meta }
                searchableFields={ null }
                label={ label }
                input={ input }/>);
   });

});
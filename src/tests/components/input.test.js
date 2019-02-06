import React from 'react';
import { shallow } from 'enzyme';
import {Input}  from '../../components/input';

const meta = {
    touched: false,
    error: null
};

const input = {
    name: 'item'
};

const label = 'my input';
const type = 'text';

describe('<Input />', () => {
    it('Renders without crashing', () => {
        shallow(<Input 
                    meta={ meta }
                    input={ input }
                    label={ label }
                    type={ type }/>);
   });

});
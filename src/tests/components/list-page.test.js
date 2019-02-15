import React from 'react';
import { shallow, mount } from 'enzyme';
import {ListPage}  from '../../components/list-page';

const match = { params: { type: 'item'}}

describe('<ListPage />', () => {
    const data = [];
    it('Renders without crashing', () => {
        shallow(<ListPage 
            match={ match }
            data={ data }
        />);  
   });

});
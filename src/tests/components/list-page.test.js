import React from 'react';
import { shallow } from 'enzyme';
import {ListPage}  from '../../components/list-page';

const match = { params: { type: 'item'}}

describe('<ListPage />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ListPage 
                    match={ match }/>);
   });

});
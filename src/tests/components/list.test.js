import React from 'react';
import { shallow } from 'enzyme';
import {List}  from '../../components/list';

const data = [{ 
    id: 123,
    product: 'item'
}];

const match ={
    params: {
        name: 'item'
    }
};

describe('<List />', () => {
    
    it('Renders without crashing', () => {
        shallow(<List 
                    data={ data }
                    match={ match }/>);
   });

});
import React from 'react';
import { shallow } from 'enzyme';
import {SearchPage}  from '../../components/search-page';


describe('<SearchPage />', () => {
    
    it('Renders without crashing', () => {
        const options = { product: [], checkedIn: [], category: [], manufacturer: [] };
        shallow(<SearchPage options={ options }/>);
   });

});
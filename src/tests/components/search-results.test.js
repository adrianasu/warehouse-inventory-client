import React from 'react';
import { shallow } from 'enzyme';
import {SearchResults}  from '../../components/search-results';


describe('<SearchResults />', () => {
    
    it('Renders without crashing', () => {
        const match = { params: { option: 'item'}}
        shallow(<SearchResults match={ match }/>);
   });

});
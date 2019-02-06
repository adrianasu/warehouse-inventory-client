import React from 'react';
import { shallow } from 'enzyme';
import {Results}  from '../../components/results';


describe('<Results />', () => {
    
    it('Renders without crashing', () => {
        const currData = [];
        shallow(<Results currData={ currData } />);
   });

});
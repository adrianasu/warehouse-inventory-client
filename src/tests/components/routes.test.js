import React from 'react';
import { shallow } from 'enzyme';
import {Routes}  from '../../components/routes';


describe('<Routes />', () => {
    
    it('Renders without crashing', () => {
        shallow(<Routes />);
   });

});
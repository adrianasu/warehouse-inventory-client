import React from 'react';
import { shallow } from 'enzyme';
import {InRouter}  from '../../components/in-router';

describe('<InRouter />', () => {
    
    it('Renders without crashing', () => {
        shallow(<InRouter />);
   });

   it('Should not render if it is Welcome page', () => {
       const wrapper = shallow(
            <InRouter
                isWelcome={ true }
                />);
        expect(wrapper.find('.nav-container').exists()).toEqual(false);
   });

});
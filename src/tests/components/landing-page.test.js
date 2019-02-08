import React from 'react';
import { shallow } from 'enzyme';
import {LandingPage}  from '../../components/landing-page';

describe('<LandingPage />', () => {
    
    it('Renders without crashing', () => {
        const dispatch = jest.fn();
        shallow(<LandingPage 
                    landing={dispatch}/>);
   });

});
import React from 'react';
import { shallow } from 'enzyme';
import {SignUpModal}  from '../../components/sign-up-modal';

describe('<SignUpModal />', () => {
    
    it('Renders without crashing', () => {
        const dispatch = jest.fn();
        shallow(<SignUpModal 
            fetchOptions={ dispatch }/>);
   });

});
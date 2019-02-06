import React from 'react';
import { shallow } from 'enzyme';
import {ModalContainer}  from '../../components/modal-container';

describe('<ModalContainer />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ModalContainer />);
   });

});
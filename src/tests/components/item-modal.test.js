import React from 'react';
import { shallow } from 'enzyme';
import {ItemModal}  from '../../components/item-modal';

describe('<ItemModal />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ItemModal />);
   });

});
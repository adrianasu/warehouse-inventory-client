import React from 'react';
import { shallow } from 'enzyme';
import {ManagePage}  from '../../components/manage-page';

describe('<ManagePage />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ManagePage />);
   });

});
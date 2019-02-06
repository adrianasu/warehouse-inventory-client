import React from 'react';
import { shallow } from 'enzyme';
import {SideDrawer}  from '../../components/side-drawer';

describe('<SideDrawer />', () => {
    
    it('Renders without crashing', () => {
        shallow(<SideDrawer 
                show={ true }/>);
   });

});
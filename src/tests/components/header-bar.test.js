import React from 'react';
import { shallow } from 'enzyme';
import {HeaderBar}  from '../../components/header-bar';

describe('<HeaderBar />', () => {
    const user = {
        employee: {
            firstName: 'John',
            lastName: 'Doe',
            accessLevel: 10
        }
    }
    
    it('Renders without crashing', () => {
        const callback = jest.fn();
        shallow(<HeaderBar 
                    drawerOpenClickHandler= { callback }
                    user={ user }
                    />);
   });

});
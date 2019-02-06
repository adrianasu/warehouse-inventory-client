import React from 'react';
import { shallow } from 'enzyme';
import { PublicAdminLinks }  from '../../components/public-admin-links';


describe('<PublicAdminLinks />', () => {

    it('Renders without crashing', () => {
        shallow(<PublicAdminLinks />);
    });

});
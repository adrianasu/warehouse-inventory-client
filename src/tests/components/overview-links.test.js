import React from 'react';
import { shallow } from 'enzyme';
import { OverviewLinks }  from '../../components/overview-links';


describe('<OverviewLinks />', () => {

    it('Renders without crashing', () => {
        shallow(<OverviewLinks />);
    });

});
import React from 'react';
import { shallow } from 'enzyme';
import { LoggedOutBar }  from '../../components/logged-out-bar';

describe('<LoggedOutBar />', () => {

    it('Renders without crashing', () => {
        shallow(<LoggedOutBar />)
   });

});
import React from 'react';
import { shallow } from 'enzyme';
import CheckInPage from '../../components/check-in-page';

describe('<CheckInPage />', () => {

    it('Renders without crashing', () => {
        shallow(<CheckInPage />);
   });

});
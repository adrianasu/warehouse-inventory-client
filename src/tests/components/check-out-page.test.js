import React from 'react';
import { shallow } from 'enzyme';
import CheckOutPage from '../../components/check-out-page';


describe('<CheckOutPage />', () => {

    it('Renders without crashing', () => {
        shallow(<CheckOutPage />);
   });

});
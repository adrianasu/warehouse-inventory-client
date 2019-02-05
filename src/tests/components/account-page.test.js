import React from 'react';
import { shallow } from 'enzyme';
import AccountPage from '../../components/account-page';

describe('<AccountPage />', () => {
    it('Renders without crashing', () => {
        shallow(<AccountPage />);
    });

});
import React from 'react';
import { shallow } from 'enzyme';
import { ConfirmDelete } from '../../components/confirm-delete';

describe('<ConfirmDelete />', () => {

    it('Renders without crashing', () => {
        shallow(<ConfirmDelete />);
    });

});
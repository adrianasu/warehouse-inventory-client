import React from 'react';
import { shallow } from 'enzyme';
import { NonModalContainer }  from '../../components/non-modal-container';


describe('<NonModalContainer />', () => {

    it('Renders without crashing', () => {
        shallow(<NonModalContainer />);
    });

});
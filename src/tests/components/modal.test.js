import React from 'react';
import { shallow } from 'enzyme';
import { Modal }  from '../../components/modal';


describe('<Modal />', () => {

    it('Renders without crashing', () => {
        shallow(<Modal />);
    });

});
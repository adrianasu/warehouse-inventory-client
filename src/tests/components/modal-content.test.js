import React from 'react';
import { shallow } from 'enzyme';
import {ModalContent}  from '../../components/modal-content';

const data = [ 
    {
        _id: 1234,
        name: 'hammer',
        category: { name: 'tools' },
        manufacturer: { name: 'truper' },
        model: 'abc12',
        minimumRequired: { units: 'pieces' }
}];

const dataType = 'useful-life';

describe('<ModalContent />', () => {
    
    it('Renders without crashing', () => {
        shallow(<ModalContent
                dataType={ dataType }
                data={ data } />);
   });

});
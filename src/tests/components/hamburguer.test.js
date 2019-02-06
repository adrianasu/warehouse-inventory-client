import React from 'react';
import { shallow } from 'enzyme';
import Hamburguer  from '../../components/hamburguer';

describe('<Hamburguer />', () => {

    it('Renders without crashing', () => {
        const callback = jest.fn();
        shallow(<Hamburguer 
                    click= { callback }/>);
   });

});
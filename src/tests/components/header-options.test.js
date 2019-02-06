import React from 'react';
import { shallow } from 'enzyme';
import {HeaderOptions}  from '../../components/header-options';

describe('<HeaderOptions />', () => {
    
    it('Renders without crashing', () => {
        shallow(<HeaderOptions />);
   });

   it('Should send to a route when clicked', () => {
       const e = { target: { value: 'search'}};
       const callback = jest.fn();
       const dispatch = jest.fn();
       const historyMock = { push: jest.fn()}
       const wrapper = shallow(
            <HeaderOptions
                history={ historyMock }
                closeOrUnderline={ callback }
                handleClick={ callback }
                underlineOption={ dispatch }
                />);
        wrapper.instance().handleClick(e);
        expect(historyMock.push.mock.calls[0]).toEqual([(`/${e.target.value}`)]);
   })

});
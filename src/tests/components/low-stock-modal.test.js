import React from 'react';
import { shallow } from 'enzyme';
import { LowStockModal }  from '../../components/low-stock-modal';

const modalProps ={
    productId: 1234
};

const data = [ { product :{
    _id: 1234,
}}]

describe('<LowStockModal />', () => {

    it('Renders without crashing', () => {
        shallow(<LowStockModal 
            modalProps={ modalProps }
            data={ data }/>)
   });

   it(`Should fire onClose when clicked`, () => {
        const dispatch = jest.fn();
        const callback = jest.fn();
        const wrapper = shallow(
            <LowStockModal 
                modalProps={ modalProps }
                data={ data }
                onClose={ callback }
                hideModal={ dispatch } />);
        wrapper.instance().onClose();
        expect(dispatch).toHaveBeenCalledTimes(1);
   });


});
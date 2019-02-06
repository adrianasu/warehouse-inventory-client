import React from 'react';
import { shallow } from 'enzyme';
import { CheckModal } from '../../components/check-modal';

const data = {
    product: { name: 'Awesome Product' }
};

describe('<CheckModal />', () => {

    it('Renders without crashing', () => {
        shallow(<CheckModal data={data}/>);
   });

   it('Renders title', () => {
        const wrapper = shallow(<CheckModal data={data} /> );
        expect(wrapper.contains(<h1>{ data.product.name }</h1>)).toEqual(true);
   });

   it('Dispatches hideModal and checkInOrOutReset on click', () => {
       const callback = jest.fn();
       const dispatch = jest.fn();
       const wrapper = shallow(
            <CheckModal 
                data={data}     
                onClose={ callback } 
                checkInOrOutReset={dispatch} 
                hideModal={dispatch} />);
       wrapper.instance().onClose();
       expect(dispatch).toHaveBeenCalledTimes(2);
   });


});
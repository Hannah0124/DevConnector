import React from 'react'; 
import Enzyme, {shallow, mount} from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
import Landing from '../src/components/layout/Landing'; 
import store from '../src/store'; 
import { Provider } from 'react-redux'; 

Enzyme.configure({adapter: new Adapter()}); 

describe('Landing component', () => { 
  test('Landing renders', () => { 
    const wrapper = shallow(<Provider store={store}><Landing /></Provider>); 
    
    expect(wrapper.exists()).toBe(true); 
  }); 
}); 
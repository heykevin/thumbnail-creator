import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {Button} from 'react-bootstrap';
import App from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('button increments by one when clicked', () => {
  const capp = shallow(<App/>);
  const button = capp.find('div.button-area');
  expect(button).toHaveLength(1);
  button.simulate('click')
  localStorage.getItem();
  expect(localStorage).toHaveBeenCalled();
});

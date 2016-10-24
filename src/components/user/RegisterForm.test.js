import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import RegisterForm from './RegisterForm';

function setup(submitting) {
  const props = {
    user: {}, submitting: submitting, errors: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return shallow(<RegisterForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Register');
  });

  it('save button is labeled "Register" when not precessing', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Register');
  });

  it('save button is labeled "Registering..." when precessing', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Registering...');
  });
});

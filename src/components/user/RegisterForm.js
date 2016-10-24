import React from 'react';
import TextInput from '../common/TextInput';

const CourseForm = ({user, onSubmit, onChange, submitting, errors}) => {
  return (
    <form>
      <h1>Register</h1>
      <TextInput
        name="username"
        label="Username"
        value={user.username}
        onChange={onChange}
        error={errors.username}/>

      <TextInput
        name="password"
        label="Password"
        type="password"
        value={user.password}
        onChange={onChange}
        error={errors.password}/>

      <TextInput
        name="passwordConfirm"
        label="Password confirm"
        type="password"
        value={user.passwordConfirm}
        onChange={onChange}
        error={errors.passwordConfirm}/>

      <input
        type="submit"
        disabled={submitting}
        value={submitting ? 'Registering...' : 'Register'}
        className="btn btn-primary"
        onClick={onSubmit}/>
    </form>
  );
};

CourseForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default CourseForm;

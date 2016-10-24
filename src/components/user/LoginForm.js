import React from 'react';
import TextInput from '../common/TextInput';

const LoginForm = ({user, onSubmit, onChange, submitting, errors}) => {
  return (
    <form>
      <h1>Login</h1>
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

      <input
        type="submit"
        disabled={submitting}
        value={submitting ? 'Logging in' : 'Login'}
        className="btn btn-primary"
        onClick={onSubmit}/>
    </form>
  );
};

LoginForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;

import {Link} from 'react-router';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import RegisterForm from './RegisterForm';
import toastr from 'toastr';

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      registering: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  registerFormIsValid() {
    let formIsValid = true;
    let errors = {};

    const minUsernameLength = 3;
    const minPassLength = 6;

    if (this.state.user.username.length < minUsernameLength) {
      errors.username = `Username must be at least ${minUsernameLength} characters.`;
      formIsValid = false;
    } else if (this.state.user.password.length < minPassLength) {
      errors.password = `Password must be at least ${minPassLength} characters.`;
      formIsValid = false;
    } else if (this.state.user.username === this.state.user.password) {
      errors.password = `Username and Password should not be equal.`;
      formIsValid = false;
    } else if (this.state.user.password !== this.state.user.passwordConfirm ||
               this.state.user.passwordConfirm.length < minPassLength) {
      errors.passwordConfirm = `Password confirm and Password should be equal.`;
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  registerUser(event) {
    event.preventDefault();

    if (!this.registerFormIsValid()) {
      return;
    }

    this.setState({registering: true});

    this.props.actions.registration(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({registering: false});
      });
  }

  redirect() {
    this.setState({registering: false});
    toastr.success(`You are successfully registered and logged in as '${this.state.user.username}'`);
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <RegisterForm
          onChange={this.updateUserState}
          onSubmit={this.registerUser}
          user={this.state.user}
          errors={this.state.errors}
          saving={this.state.registering}
        />
        <Link to="login" className="pull-right">Sign-in</Link>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
RegisterPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let user = {username: "", password: "", passwordConfirm: ""};

  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

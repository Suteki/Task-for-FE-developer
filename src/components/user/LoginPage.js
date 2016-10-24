import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      entering: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  loginFormIsValid() {
    let formIsValid = true;
    let errors = {};

    const minLength = 1;

    if (this.state.user.username.length < minLength || this.state.user.password.length < minLength) {
      errors.username = `Fill input fields`;
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  loginUser(event) {
    event.preventDefault();

    if (!this.loginFormIsValid()) {
      return;
    }

    this.setState({entering: true});

    this.props.actions.authentication(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({entering: false});
      });
  }

  redirect() {
    this.setState({entering: false});
    toastr.success(`You are logged in as '${this.state.user.username}'`);
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
        <LoginForm
          onChange={this.updateUserState}
          onSubmit={this.loginUser}
          user={this.state.user}
          errors={this.state.errors}
          saving={this.state.entering}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
LoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let user = {username: "", password: ""};

  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

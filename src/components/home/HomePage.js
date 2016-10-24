import {Link} from 'react-router';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';
import ImageGallery from 'react-image-gallery';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      auth: Object.assign({}, props.auth)
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  logoutUser(event) {
    event.preventDefault();

    this.props.actions.logout()
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
      });
  }

  redirect() {
    toastr.success(`You are successfully logged out`);
    this.context.router.push('/login');
  }

  handleImageLoad(event) {
    // console.log('Image loaded ', event.target)
  }

  render() {

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        originalAlt: 'original-alt',
        thumbnailAlt: 'thumbnail-alt',
        // thumbnailLabel: 'Optional',
        // description: 'Optional description...',
        srcSet: 'Optional srcset (responsive images src)',
        sizes: 'Optional sizes (image sizes relative to the breakpoint)'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ];

    if (!this.props.auth) {
      this.context.router.push('/login');
      return (<div/>);
    } else {
      return (
        <div>
          <div className="jumbotron">
            <p className="pull-right"><b>{this.props.auth ? this.props.auth.username : ""}</b>, welcome to our site!</p>
          </div>
          <h1>Home</h1>
          <p>Sample gallery</p>

          <ImageGallery
            ref={i => this._imageGallery = i}
            items={images}
            slideInterval={2000}
            onImageLoad={this.handleImageLoad}/>

          <div className="jumbotron">
            <Link onClick={this.logoutUser} className="pull-right">Logout</Link>
          </div>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
HomePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.user.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

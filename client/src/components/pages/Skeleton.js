import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "221904719683-hemk9j1nbjrbfim7b084b31be1j2q1be.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position='fixed'>
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
          <Typography variant='h5'>
            Disaster Plan
          </Typography>
        </AppBar>
      </ React.Fragment>
    );
  }
}

export default Skeleton;

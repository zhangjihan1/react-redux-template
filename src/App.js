import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Welcome from "./views/Welcome/Welcome"
import Home from "./views/Home/Home";
import SignUp from "./views/SignUp/SignUp";
import SignIn from "./views/Signin/Signin";
import TaskManagement from "./views/TaskManagement/TaskManagement";
import { Auth } from 'aws-amplify';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { updateUserLoginStatus } from "./actions/AuthManagementAction";

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthManagementReducer.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserLoginStatus: bindActionCreators(updateUserLoginStatus, dispatch)
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    if (!this.props.isAuthenticated) this.getUserSession();
  }

  //get authentification session data and update user auth status
  getUserSession = async () => {
    try {
      const userInform = await Auth.currentAuthenticatedUser();
      this.props.updateUserLoginStatus({ username: userInform.username, email: userInform.attributes.email });
    } catch (error) {
      console.log("Retrive use session: " + error);
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/welcome" component={Welcome} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />

              <Route path="/" exact >
                {isAuthenticated ? <Home /> : <Redirect to={{ pathname: "signin", state: { refer: "/" } }} />}
              </Route>

              <Route path="/taskmanagement">
                {isAuthenticated ? <TaskManagement /> : <Redirect to={{ pathname: "signin", state: { refer: "/taskmanagement" } }} />}
              </Route>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


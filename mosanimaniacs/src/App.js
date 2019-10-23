import React, { Component } from 'react';
import { Route, Switch, Link, BrowserHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history/history';
import Welcome from './components/Welcome';

class App extends Component {
  render() {
    return (
      <div>
        <p>This is a test</p>
        <Router history={history}>
          <Route exact path="/home" component={Welcome}></Route>
        </Router>
      </div>
    )
  }

  // function mapStateToProps(state) {
  //   return {

  //   }
  // }
}

export default App;

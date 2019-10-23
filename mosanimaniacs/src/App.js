import React, { Component } from 'react';
import { Route, Switch, Link, BrowserHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history/history';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/quiz/Quiz';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <Switch>
            <Route exact path="/home" component={Welcome}></Route>
            <Route path="/" component={Quiz}></Route>
          </Switch>
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

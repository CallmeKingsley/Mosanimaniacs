import React, { Component } from 'react';
import { Route, Switch, Link, BrowserHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history/history';

import Nav from './components/navigation/Nav';

import Welcome from './components/Welcome';
import Quiz from './components/quiz/Quiz';
import Question from './components/Question';
import Conclusion from './components/Conclusion';


class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Nav />
          <Switch>
            <Route exact path="/home" component={Welcome}></Route>
            <Route exact path="/quiz" component={Quiz}></Route>
            <Route path="/quiz/question/:id" component={Question}></Route>
            <Route path="/conclusion" component={Conclusion}></Route>
          </Switch>
        </Router>
      </div>
    )
  }

  // function mapStateToProps(state) {
  //   return {

  //   }
  // }
  //oh hai mark
}

export default App;

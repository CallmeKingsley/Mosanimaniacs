import React, { Component } from 'react';
import { Route, Switch, Link, BrowserHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history/history';
import Welcome from './components/quiz/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/quiz/Quiz';
import StartQuiz from './components/quiz/StartQuiz';
import Question from './components/quiz/Question';
import Conclusion from './components/quiz/Conclusion';
import './App.css';
import { bindActionCreators } from 'redux';
import * as ActionCreators from './redux/actions/index'; 



class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Welcome}></Route>{/* A component that says "welcome to this app" or something */}
            <Route exact path="/quiz" component={Quiz}></Route>{/* The menu where you can select the topic (DC Theory, Codes, etc) */}
            <Route exact path="/quiz/start" component={StartQuiz}></Route>{/* The screen you see when you're about to start a quiz, shows team/question info */}
            <Route path="/quiz/question/:id" component={Question}></Route> {/* The indiviudal questions*/}
            <Route path="/conclusion" component={Conclusion}></Route> {/* The final score screen */}
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

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history/history';
import Welcome from './components/quiz/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './components/quiz/Quiz';
import StartQuiz from './components/quiz/StartQuiz';
import Question from './components/quiz/Question';
import QuizResults from './components/quiz/QuizResults';
import CreateQuiz from './components/admin/createQuiz';
import QuizBank from './components/admin/quizBank';
import './App.css';

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
            <Route path="/quiz/results" component={QuizResults}></Route> {/* The final score screen */}
            <Route exact path="/admin" component={QuizBank}></Route> {/* The admin main screen */}
            <Route path="admin/edit/:quizId" component={CreateQuiz}></Route> {/* The edit quiz screen */}
            <Route path="/admin/create" component={CreateQuiz}></Route> {/* The create quiz component */}
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

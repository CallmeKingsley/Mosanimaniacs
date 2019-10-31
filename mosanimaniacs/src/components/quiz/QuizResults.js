import React, { Component } from "react";
import { connect } from "react-redux";

class QuizResults extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to the quiz customizer app</h1>
                <a href="/quiz">Click here to take the quiz</a>
            </div>
        )
    }
}

export default QuizResults;
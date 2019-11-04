import React, { Component } from "react";
import '../../css/Results.css';
import { connect } from "react-redux";

class QuizResults extends Component {
    render() {
        const { questions, points } = this.props;
        return (
            <div className="container">
                <h1 className="text-center">Let's see how you did!</h1>
                <div id="quiz-results">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>Y/N</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                questions.map((el,i) => (
                                    <tr key={i} className={el.Correct ? "correct" : "incorrect"}>
                                        <td>{i + 1}</td>
                                        <td>{el.Question}</td>
                                        <td>{el.Answer}</td>
                                        <td>{el.Correct ? "Y" : "N"}</td>
                                        <td>{el.Points}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    <h2>Points: {points}</h2>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const questions = state.ScoreReducer.responses;
    const points = state.ScoreReducer.points;
    return {
        questions,
        points
    }
}

export default connect(mapStateToProps)(QuizResults);
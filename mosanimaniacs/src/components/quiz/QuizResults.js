import React, { Component } from "react";
import '../../css/Results.css';
import { postResponses } from '../../redux/actions/index';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

class QuizResults extends Component {

    componentWillMount() {
        this.props.postResponses('/api/responses',this.props.responses);
    }

    render() {
        const { questions, points } = this.props;
        return (
            <section id="quizResults">
                <header>
                    <h1 className="text-center">Let's see how you did!</h1>
                </header>
            <div className="container">
                <div id="quiz-results">
                    <table>
                        <tbody>
                            <tr>
                                <td>#</td>
                                <td>Question</td>
                                <td>Correct Answer</td>
                                <td>Y/N</td>
                                <td>Points</td>
                            </tr>
                                {
                                    questions.map((el,i) => (
                                        <tr key={i} className={el.Correct ? "correct" : "incorrect"}>
                                            <td>{i + 1}</td>
                                            <td>{el.question}</td>
                                            <td>{el.correctAnswer}</td>
                                            <td>{el.Correct ? "Y" : "N"}</td>
                                            <td>{el.Points}</td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                    <h2>Total Points: {points}</h2>
                </div>
                <Link to="/"><button type="button" className="btn btn-info returnHome">Home</button></Link>
            </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const questions = state.ScoreReducer.responses;
    const points = state.ScoreReducer.points;
    const responses = state.ScoreReducer.responses;
    return {
        questions,
        points,
        responses
    }
}

export default connect(mapStateToProps, {
    postResponses
})(QuizResults);
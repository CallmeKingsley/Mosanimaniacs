import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestions, getResponses } from '../../redux/actions/index';
import { getAllQuizzes } from '../../redux/actions/quizAdmin';
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';

class SelectQuiz extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { quizzes } = this.props;
        return (
            <section id="renderedQuizzes">
                {/* Rendered quizzes will go here */}
                <header>
                    <h1 className="text-center">Which quiz would you like to take?</h1>
                </header>
                <div className="container">
                    <div className="chooseQuiz">
                    {quizzes.map((quiz, index) => {
                    return  <Link to={"/quiz/dct/start"} onClick={() => {
                                    this.props.getQuestions(`/api/quizzes/${quiz._id}`);
                                    this.props.getResponses(`/api/quizzes/${quiz._id}`);
                                    this.props.getAllQuizzes('/api/quizzes');
                                }}>
                                    <button type="button" className="btn btn-success">
                                        <h3>{quiz.quizTitle}</h3>
                                    </button>
                                </Link>
                        })
                    }
                    </div>
                    <Link to="/"><button type="button" className="btn btn-info returnHome">Home</button></Link>
                </div>
            </section>        
        )
    }
}

function mapStateToProps(state) {
    const quizzes = state.QuizzesReducer.quizzes;
    return {
        quizzes
    }
}

export default connect(mapStateToProps, {
    getQuestions,
    getResponses,
    getAllQuizzes
})(SelectQuiz);
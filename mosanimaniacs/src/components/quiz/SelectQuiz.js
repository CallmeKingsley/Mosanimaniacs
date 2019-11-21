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
            // <div id="start-quiz">
            //     <Link className="course-link" to={`/quiz/dct/question/${index}`} >Start Quiz</Link>
            // </div>
            <div id="renderedQuizzes">
                {/* Rendered quizzes will go here */}
                {quizzes.map((quiz, index) => {
                    return  <div>
                                <Link to={"/quiz/dct/start"} onClick={() => {
                                    this.props.getQuestions(`/api/quizzes/${quiz._id}`);
                                    this.props.getResponses(`/api/quizzes/${quiz._id}`);
                                    this.props.getAllQuizzes('/api/quizzes');
                                }}>
                                    <button type="button" className="btn btn-success">
                                        <h3>{quiz.quizTitle}</h3>
                                    </button>
                                </Link>
                            </div> 
                        })
                    }
            </div>
        
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
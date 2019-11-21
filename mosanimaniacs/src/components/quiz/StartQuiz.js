import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';

class StartQuiz extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { question, index } = this.props;
        if (this.props.question) {
            console.log(question[index]);
        }
        return (
            <div id="start-quiz">
                <Link className="course-link" to={`/quiz/dct/question/${index}`} >Start Quiz</Link>
                <Link to="/"><button type="button" className="btn btn-secondary">Home</button></Link>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    const question = state.QuestionReducer.questions;
    const index = state.ScoreReducer.selectedQuestionIndex;
    return {
        question: question,
        index: index
    }
}

export default connect(mapStateToProps)(StartQuiz);
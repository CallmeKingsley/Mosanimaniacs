import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Welcome.css';
import {Link} from 'react-router-dom';

class StartQuiz extends Component {
    render() {
        const { question, index } = this.props;
        if (this.props.question) {
            console.log(question[index]._id);
        }
        return (
            <div id="start-quiz">
                <Link className="course-link" to={`/quiz/question/${index}`} >Start Quiz</Link>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    const question = state.questions.data;
    const index = state.selectedQuestionIndex;
    return {
        question: question,
        index: index
    }
}

export default connect(mapStateToProps)(StartQuiz);
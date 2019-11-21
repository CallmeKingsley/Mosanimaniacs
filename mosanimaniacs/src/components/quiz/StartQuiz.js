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
            <section id="start-quiz">
                <header>
                    <h1 className="text-center">Click "Start Quiz" to Begin!</h1>
                </header>
                <div className="container startQuiz">
                    <Link className="course-link" to={`/quiz/dct/question/${index}`} >
                        <button className="btn btn-primary">Start Quiz</button>
                    </Link>
                    <Link to="/"><button type="button" className="btn btn-info returnHome">Home</button></Link>
                </div>
            </section>
            
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
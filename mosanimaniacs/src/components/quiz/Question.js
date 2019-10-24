import React, { Component } from "react";
import { connect } from "react-redux";
//import {getQuestions} from '../../redux/actions/index';

class Question extends Component {

    constructor(props) {
        super(props);
        //this.renderAnswerChoices = this.renderAnswerChoices.bind(this);
    }

    // componentWillMount() {
    //     console.log(this.props.questions);
    // }

    // renderAnswerChoices() {
    //     selectedQuestion.Question.forEach(element => {
            
    //     });
    // }

    render() {
        const { question, index, selectedQuestion } = this.props;
        console.log(selectedQuestion);
        //const getQuestions = bindActionCreators(ActionCreators.getQuestions, dispatch);
        return (
            <div>
                <h2>{selectedQuestion.Question}</h2>
                <ul className="answer-choices">
                    {
                        selectedQuestion.Options.map((el,i) => (
                            <li key={i}>{el}</li>
                        )
                    )}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const questions = state.questions.data;
    const index = state.selectedQuestionIndex;
    const selectedQuestion = questions[index];
    return {
        questions: questions,
        index: index,
        selectedQuestion: selectedQuestion
    }
}

export default connect(mapStateToProps)(Question);
import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Question.css';
import Countdown from 'react-countdown-now';
import {nextQuestion} from '../../redux/actions/index';
import {Link} from 'react-router-dom';

const renderer = ({ seconds }) => {
    return <span>{seconds}</span>;
};

    var total = 500;
    var newNum = 10;

    function pointDecrease(){
        total = total - newNum;
        return total;
    }

    pointDecrease();

class Question extends Component {

    constructor(props) {
        super(props);
        this.incrementOptionIndex = this.incrementOptionIndex.bind(this);
    }

    incrementOptionIndex(num) {
        switch(num) {
            case 0:
                return 'A';
                break;
            case 1:
                return 'B';
                break;
            case 2:
                return 'C';
                break;
            case 3:
                return 'D';
                break;
            case 4:
                return 'E';
                break;
            default:
                return 'no answer choice';
        }
    }

    render() {
        const { question, index, selectedQuestion } = this.props;
        console.log(selectedQuestion);
        return (
            <>
            {/*<div>
                <h2>{selectedQuestion.Question}</h2>
                <ul className="answer-choices">
                    {
                        selectedQuestion.Options.map((el,i) => (
                            <li key={i}>{el}</li>
                        )
                    )}
                </ul>
            </div>
             */}
            <div>
                <div className="lightGreen">
                    <div className="darkGrey">
                        <div className="headerContainer">
                            <div id="schoolName">South Ohio Technical School</div>
                            <div id="profileImg"></div>
                        </div>
                     </div>
                    <div className="navyBlue">
                        <h2>{selectedQuestion.Question}</h2>
                    </div>
                    <div className="question-points-section">
                        <div id="answers">

                            {
                                selectedQuestion.Options.map((el,i) => (
                                    <div className="answer">
                                        <div className="circle" key={i}>{this.incrementOptionIndex(i)}</div>
                                        <p>{el}</p>
                                    </div>
                                )
                            )}

                            {/* <div className="answer">
                                <div className="circle">1</div>
                            </div>
                            <div className="answer">
                                <div className="circle">2</div>
                            </div>
                            <div className="answer">
                                <div className="circle">3</div>
                            </div>
                            <div className="answer">
                                <div className="circle">4</div>
                            </div> */}
                        </div>
                        <div id="time">
                            <div id="countdown">
                                 <Countdown
                                    date={Date.now() + 30000}
                                    renderer={renderer}/>
                            </div>
                            <div id="seconds"> seconds</div>
                            <div id="value"> Question Value</div>
                            <div id="addPoints">{total}</div>
                        </div>
                        <div id="score"></div>
                        <div></div>
                        {/* <button onClick={() => this.props.nextQuestion()}>oh hai mark</button> */}
                        <Link onClick={() => this.props.nextQuestion(1)} className="course-link" to={`/quiz/question/${index}`}>hai babe</Link>
                     </div>
                </div>
            </div>
            </>
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

export default connect(mapStateToProps,{
    nextQuestion
})(Question);
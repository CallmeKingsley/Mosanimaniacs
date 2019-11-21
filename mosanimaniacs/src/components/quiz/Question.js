import React, { Component, createRef, useRef } from "react";
import { connect } from "react-redux";
import '../../css/Question.css';
import {changeQuestion, updatePlayerAttempts, updateScore, postResponses} from '../../redux/actions/index';
import {Link} from 'react-router-dom';

class Question extends Component {

    constructor(props) {
        super(props);
        this.timer = 0;
        this.answerChoice = [];
        this.nextQuestion = React.createRef();
        this.state = {
            total: 500,
            seconds: 30,
            attempted: false,
            correct: null,
            message: ""
        }
    }

    componentDidMount() {
        this.resetQuestion(false);
    }

    renderNavBtn = (totalNum, currNum) => {
        const incIndex = currNum + 1;
        const points = this.state.correct ? this.state.total : 0;
        if (totalNum === currNum) {
            return (
                <Link className="course-link question-btn"
                to={'/quiz/results'} 
                onClick={() => {
                        this.props.updatePlayerAttempts(this.state.attempted,this.state.correct,this.props.index,points);
                        // this.props.postResponses('/api/responses',this.props.responses);
                    }}>
                    Finish Quiz
                </Link>
            )
        } else {
            return (
                <Link className="course-link next-disabled question-btn next-question"
                onClick={() => {
                    this.props.changeQuestion(1);
                    this.resetQuestion(true);
                    this.renderNavBtn(this.props.questions.length, this.props.index);
                }} 
                ref={this.nextQuestion}
                to={`/quiz/dct/question/${incIndex}`}>
                    Next Question &rarr;
                </Link>
            )
        }
    }

    resetQuestion = (bool) => {

        if (bool) {
            const {attempted, correct, total} = this.state;
            const points = correct ? total : 0;
            this.props.updatePlayerAttempts(attempted,correct,this.props.index,points);
            this.setState({
                total: 500,
                seconds: 30,
                attempted: false,
                correct: null,
                message: ""
            });
            this.nextQuestion.current.classList.add("next-disabled");
        }
        this.answerChoice.forEach(el => {
            el.classList.remove("correct", "incorrect", "choice-disabled");
        });
        this.timer = 0;
        this.startTimer();
    }

    startTimer = () => {
        if (this.timer == 0 && this.state.seconds >= 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });
        
        // Check if we're at zero.
        switch (seconds) {
            case 20:
            case 17:
            case 14:
            case 11:
            case 8:
            case 5:
            case 2:
                this.pointDecrease(50);
                break;
            case 0:
                this.revealAnswer(true);
                this.timer = 0;
                break;
        }
    }

    incrementOptionIndex = (num) => {
        switch(num) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            case 4:
                return 'E';
            default:
                return 'no answer choice';
        }
    }

    pointDecrease = (num) => {
        this.setState({total: this.state.total - num});
    }

    revealAnswer = (bool) => {
        let {index, questions, selectedQuestion} = this.props;
        let correctAnswer = questions[index].correctAnswer;
        if (selectedQuestion.type === "multiple-choice") {
            this.answerChoice.forEach(el => {
                el.classList.add('choice-disabled');
                let text = el.textContent;
                text = text.substring(1);
                if (text === correctAnswer) {
                    el.classList.add("correct");
                }
            });    
        }
        if (bool) {
            this.nextQuestion.current.classList.remove("next-disabled");
            this.setState({
                attempted: true,
                seconds: 0,

                correct: false,
                message: "Time's up! Here is the correct answer. Select the next question button to continue."
            });
            clearInterval(this.timer);
        }
    }

    checkAnswer = (e) => {
        e.preventDefault();
        const { selectedQuestion } = this.props;
        let selectedAnswer; 
        if (selectedQuestion.type === "multiple-choice") {
            selectedAnswer = e.target.dataset.answer;
        } else if (selectedQuestion.type === "fill-in-blank") {
            selectedAnswer = e.target.answer.value;
        }
        let {index, questions} = this.props;
        let correctAnswer = questions[index].correctAnswer;

        if (selectedQuestion.type === "multiple-choice") {
            if (selectedAnswer == correctAnswer) {
                e.target.classList.add('correct');
                this.props.updateScore(this.state.total);
                this.setState({
                    attempted: true,
                    correct: true,
                    message: "Great job! Select the next question button to continue."
                });
            } else {
                e.target.classList.add('incorrect');
                this.setState({
                    attempted: true,
                    correct: false,
                    message: "That's not it. Here's the correct answer. Select the next question button to continue."
                });
                this.revealAnswer(false);
            }
            this.answerChoice.forEach(el => el.classList.add('choice-disabled'));    
        } else if (selectedQuestion.type === "fill-in-blank") {
            if (selectedAnswer.toUpperCase() == correctAnswer.toUpperCase()) {
                this.props.updateScore(this.state.total);
                this.setState({
                    attempted: true,
                    correct: true,
                    message: "Great job! Select the next question button to continue."
                });
            } else {
                this.setState({
                    attempted: true,
                    correct: false,
                    message: `That's not it. The correct answer is "${correctAnswer}". Select the next question button to continue.`
                });
                this.revealAnswer(false);
            }
            this.answerChoice.forEach(el => el.classList.add('choice-disabled'));
        }
        clearInterval(this.timer);
        if (index !== questions.length - 1) {
            this.nextQuestion.current.classList.remove("next-disabled");
        }
    }

    render() {
        const { questions, index, selectedQuestion, points } = this.props;
        const incIndex = index + 1;
        return (
            <div>
                <div className="lightGreen">
                    <div className="darkGrey">
                        <div className="headerContainer">
                            <div id="schoolName" className="quizText">South Ohio Technical School</div>
                            <div id="profileImg"></div>
                        </div>
                     </div>
                    <div className="navyBlue">
                        <h2 className="quizText">{selectedQuestion.question}</h2>
                    </div>
                    <div className="question-points-section">
                        <div id="answers">
                            {(() => {
                                if (selectedQuestion.type === 'multiple-choice') {
                                    return selectedQuestion.answerChoices.map((el,i) => (
                                        <div className="answer" onClick={(e) => this.checkAnswer(e)} data-answer={el} ref={(ref) => {
                                                this.answerChoice[i] = ref;
                                                return true;
                                            }}>
                                            <div className="circle" key={i}>{this.incrementOptionIndex(i)}</div>
                                            <p className="quizText">{el}</p>
                                        </div>
                                    )
                                )
                                } else if (selectedQuestion.type === 'fill-in-blank') {
                                    return  <form onSubmit={this.checkAnswer}>
                                                <div className="answer">
                                                    <input type="text" name="answer" placeholder="Answer" />
                                                </div>
                                                <button type="submit">Submit Answer!</button>
                                            </form>
                                }
                            })()}
                        </div>
                        <div id="time">
                            <div id="countdown">
                                <input disabled value={this.state.seconds}/>
                            </div>
                            <div id="seconds"> seconds</div>
                            <div id="value"> Question Value</div>
                            <div id="addPoints">{this.state.total}</div>
                        </div>
                        <div id="message">
                            {this.state.message}
                        </div>
                        <div id="score">
                            <h3>YOUR SCORE</h3>
                            <p className="points"><span>{points}</span> PTS</p>
                            <h4>LEADER BOARD</h4>
                            <div>
                                <div className="scoreboard"><p>The Joker</p><p>2,212</p></div>
                                <div className="scoreboard"><p>Thanos</p><p>2,122</p></div>
                                <div className="scoreboard"><p>Antonio Brown</p><p>2,123</p></div>
                                <div className="scoreboard"><p>Florida Man</p><p>1,612</p></div>
                                <div className="scoreboard"><p>Kanye West</p><p>1,212</p></div>
                                <div className="scoreboard"><p>You</p><p>{points}</p></div>
                            </div>
                        </div>
                        <div>
                            {this.renderNavBtn(questions.length - 1, index)}
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const questions = state.QuestionReducer.questions;
    const index = state.ScoreReducer.selectedQuestionIndex;
    const selectedQuestion = questions[index];
    const points = state.ScoreReducer.points;
    const responses = state.ScoreReducer.responses;
    return {
        questions,
        index,
        selectedQuestion,
        points,
        responses
    }
}

export default connect(mapStateToProps,{
    changeQuestion,
    updatePlayerAttempts,
    updateScore,
    postResponses
})(Question);
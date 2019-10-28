import React, { Component, createRef, useRef } from "react";
import { connect } from "react-redux";
import '../../css/Question.css';
import {changeQuestion} from '../../redux/actions/index';
import {Link} from 'react-router-dom';

import { WatchContent } from 'react-mutation-observer';
import Countdown from 'react-countdown-now';

    // function pointDecrease(){
    //     total = total - newNum;
    //     return total;
    // }

    // pointDecrease();

class Question extends Component {

    constructor(props) {
        super(props);
        this.incrementOptionIndex = this.incrementOptionIndex.bind(this);
        this.pointDecrease = this.pointDecrease.bind(this);
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.answerChoice = [];
        this.nextQuestion = React.createRef();
        this.state = {
            total: 500,
            seconds: 30
        }
    }

    componentDidMount() {
        console.log("mounted");
        this.setState({
            seconds: 30
        });
        this.answerChoice.forEach(el => {
            el.classList.remove("correct", "incorrect");
        });
        this.startTimer();
    }


    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
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
                clearInterval(this.timer);
                break;
        }
    }

    incrementOptionIndex(num) {
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

    pointDecrease(num){
        this.setState({total: this.state.total - num});
    }

    checkAnswer(e) {
        let selectedAnswer = e.target.dataset.answer;
        let correctAnswer = this.props.selectedQuestion.Answer;
        if (selectedAnswer == correctAnswer) {
            e.target.classList.add('correct');
        } else {
            e.target.classList.add('incorrect');
        }
        this.answerChoice.forEach(el => el.classList.add('choice-disabled'));
        clearInterval(this.timer);
        this.nextQuestion.current.classList.remove("next-disabled");
    }

    render() {
        const { question, index, selectedQuestion } = this.props;
        const incIndex = index + 1;
        const decIndex = index - 1;

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
                        <h2 className="quizText">{selectedQuestion.Question}</h2>
                    </div>
                    <div className="question-points-section">
                        <div id="answers">
                            {
                                selectedQuestion.Options.map((el,i) => (
                                    // <div className="answer" onClick={(e) => this.checkAnswer(e)} data-answer={el} ref={answerChoice[i]}>
                                    <div className="answer" onClick={(e) => this.checkAnswer(e)} data-answer={el} ref={(ref) => {
                                            this.answerChoice[i] = ref;
                                            return true;
                                        }}>
                                        <div className="circle" key={i}>{this.incrementOptionIndex(i)}</div>
                                        <p className="quizText">{el}</p>
                                    </div>
                                )
                            )}
                        </div>
                        <div id="time">
                            <div id="countdown">
                                    <input disabled value={this.state.seconds}/>
                            </div>
                            <div id="seconds"> seconds</div>
                            <div id="value"> Question Value</div>
                            <div id="addPoints">{this.state.total}</div>
                        </div>
                        <div id="score"></div>
                        <div></div>
                        <Link onClick={() => {
                            this.props.changeQuestion(1)
                            
                        }} 
                        className="course-link next-disabled question-btn next-question" 
                        to={`/quiz/question/${incIndex}`}
                        ref={this.nextQuestion}>
                            Next Question &rarr;
                        </Link>
                        <Link onClick={() => this.props.changeQuestion(-1)} 
                        className="course-link next-disabled question-btn prev-question" to={`/quiz/question/${decIndex}`}>
                            &larr; Previous Question
                        </Link>
                     </div>
                </div>
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

export default connect(mapStateToProps,{
    changeQuestion
})(Question);
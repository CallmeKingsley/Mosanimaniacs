import React, { Component } from "react";
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

    componentDidMount() {
        this.pointDecrease(this.state.total, this.state.newNum);
    }

    constructor(props) {
        super(props);
        this.incrementOptionIndex = this.incrementOptionIndex.bind(this);
        this.pointDecrease = this.pointDecrease.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.input = React.createRef();
        this.state = {
            total: 500,
            newNum: 10,
            //timeLeft: 30
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

    pointDecrease(tot, nuevo){
        tot = tot - nuevo;
        return tot;
    }

    updateTimer() {

        // this.setState(prevState => {
        //     return prevState--;
        // })
        console.log(this.timeLeft);
    }
    // pointDecrease(tot, new){
    //     total = total - newNum;
    //     return total;
    // }

    render() {
        const { question, index, selectedQuestion } = this.props;
        const incIndex = index + 1;
        const decIndex = index - 1;
        let timeLeft;

        //const span = React.createRef();
        // const span = document.querySelector('span');
        // let config = { attributes: true, childList: true, subtree: true };
        // let observer = new MutationObserver((sec) => {
        //     this.updateTimer();
        // });
        // observer.observe(span, config);

        const renderer = ({ seconds }) => {
            // return <WatchContent
            // onChange={this.updateTimer()}>
            //     <span ref={this.span}>{seconds}</span>
            // </WatchContent>;
            this.timeLeft = seconds;
            return [<input disabled value={seconds} onChange={this.updateTimer()} ref={this.input}/>, timeLeft];
        };

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
                                    <div className="answer">
                                        <div className="circle" key={i}>{this.incrementOptionIndex(i)}</div>
                                        <p className="quizText">{el}</p>
                                    </div>
                                )
                            )}
                        </div>
                        <div id="time">
                            <div id="countdown">
                                 <Countdown
                                    date={Date.now() + 30000}
                                    renderer={renderer}/>
                            </div>
                            <div id="seconds"> seconds</div>
                            <div id="value"> Question Value</div>
                            <div id="addPoints">{this.state.total}</div>
                        </div>
                        <div id="score"></div>
                        <div></div>
                        {/* <button onClick={() => this.props.nextQuestion()}>oh hai mark</button> */}
                        <Link onClick={() => this.props.changeQuestion(1)} className="course-link" to={`/quiz/question/${incIndex}`}>hai babe</Link>
                        <Link onClick={() => this.props.changeQuestion(-1)} className="course-link" to={`/quiz/question/${decIndex}`}>you're tearing me apart Lisa!</Link>
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
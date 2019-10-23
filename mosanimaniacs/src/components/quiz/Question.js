import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Question.css';
import Countdown from 'react-countdown-now';

class Question extends Component {
    render() {
        return (
            <div>
                <div class="lightGreen">
                     <div class="darkGrey">This is a test</div>
                     <div class="navyBlue"></div>
                     <div class="question-points-section">
                        <div id="answers">
                            <div class="answer">
                                <div class="circle">1</div>
                            </div>
                            <div class="answer">
                                <div class="circle">2</div>
                            </div>
                            <div class="answer">
                                <div class="circle">3</div>
                            </div>
                            <div class="answer">
                                <div class="circle">4</div>
                            </div>
                        </div>
                        <div id="time">
                            <div id="countdown">
                                <Countdown date={Date.now() + 30000} zeroPadTime={0} />
                            </div>
                            
                            <div id="seconds"> seconds</div>
                        </div>
                        <div id="score"></div>
                     </div>
                </div>
                <div class="image"></div>
            </div>
        )
    }
}

export default Question;
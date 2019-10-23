import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Question.css';
import Countdown from 'react-countdown-now';

const renderer = ({ seconds }) => {
      return <span>{seconds}</span>;
  };

    var total = 500;
    var newNum = 10;

        function pointDecrease(){
          total = total - newNum;
        //   setTimeout(pointDecrease, 1000);
          return total;
        }

        pointDecrease();

class Question extends Component {
    
    constructor(props){
        super (props);
        this.state ={
            total:500
        }
    }

    render() {
        return (
            <div>
                <div class="lightGreen">
                     <div class="darkGrey">
                         <div class="headerContainer">
                            <div id="schoolName">South Ohio Technical School</div>
                            <div id="profileImg"></div>
                        </div>
                     </div>
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
                     </div>
                </div>

            </div>
        )
    }
}

export default Question;
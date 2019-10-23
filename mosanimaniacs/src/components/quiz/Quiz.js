import React, { Component } from "react";
import { connect } from "react-redux";
import '../../css/Quiz.css';

class Quiz extends Component {
    render() {
        return (
            <div>
                <div className="row darkGrey"> this is a test</div>
                    <div className="row lightGreen">
                        <div id="test" className="col-lg-4 navyBlue">
                            One of three columns
                        </div>
                    </div>
            </div>
        )
    }
}

export default Quiz;
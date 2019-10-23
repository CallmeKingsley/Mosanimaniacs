import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Quiz extends Component {
    render() {
        return (
            <div>
                <h1>Select a topic to begin!</h1>
                <div className="topic-selection">
                    <Link to="/home">
                        <img src={require('../../images/icon_BP.png')} alt="Blueprints"></img>
                    </Link>
                    <Link to="/home">
                        <img src={require('../../images/icon_CS.png')} alt="Codes and Safety"></img>
                    </Link>
                    <Link to="/quiz/question/:id">
                        <img src={require('../../images/icon_DC.png')} alt="DC Theory"></img>
                    </Link>
                    <Link to="/home">
                        <img src={require('../../images/icon_JI.png')} alt="Job Information"></img>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Quiz;
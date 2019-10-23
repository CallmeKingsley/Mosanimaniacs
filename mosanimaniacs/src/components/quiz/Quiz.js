import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getQuestions} from '../../redux/actions/index';

class Quiz extends Component {

    constructor(props) {
        super(props);
        let questionId;
    }
    // componentDidReceiveProps() {
    //     this.setState({
    //         questionId: this.props.question._id
    //     })
    // }

    render() {
        if (this.props.question) {
            console.log(this.props.question);
        } else {
            console.log('oh no');
        }
        return (
            <div>
                <h1>Select a topic to begin!</h1>
                <div className="topic-selection">
                    <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                        <img src={require('../../images/icon_BP.png')} alt="Blueprints"></img>
                    </a>
                    <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                        <img src={require('../../images/icon_CS.png')} alt="Codes and Safety"></img>
                    </a>
                    <Link to={`/quiz/question/${this.props.question}`} onClick={() => this.props.getQuestions('/api/questions')}>
                        <img src={require('../../images/icon_DC.png')} alt="DC Theory"></img>
                    </Link>
                    <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                        <img src={require('../../images/icon_JI.png')} alt="Job Information"></img>
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const question = state.questions.data;
    return {
        question: question
    }
}

export default connect(mapStateToProps,{
    getQuestions
})(Quiz);
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {getQuestions, getResponses} from '../../redux/actions/index';
import { getAllQuizzes } from '../../redux/actions/quizAdmin';
import '../../css/Quiz.css';

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.showHideStart = this.showHideStart.bind(this);
        let questionId;
        this.CourseBtn = React.createRef();
        this.CourseStart = React.createRef();
    }

    showHideStart() {
        const courseButton = getComputedStyle(this.CourseBtn.current);
        const courseStart = getComputedStyle(this.CourseStart.current);
        courseStart.display = 'block';
    }

    render() {
        if (this.props.question) {
            console.log(this.props.question);
        } else {
            console.log('oh no');
        }
        return (
            <section id="topicSelect">
                <header>
                    <h1 className="text-center">Select a topic to begin!</h1>
                </header>
                <div className="container">
                    <div className="topic-selection">
                        <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                            <img src={require('../../images/icon_BP.png')} alt="Blueprints"></img>
                        </a>
                        <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                            <img src={require('../../images/icon_CS.png')} alt="Codes and Safety"></img>
                        </a>
                        <Link to="/quiz/dct" className="course-button" onClick={() => {
                            this.props.getAllQuizzes('/api/quizzes');
                        }}>
                            <img src={require('../../images/icon_DC.png')} alt="DC Theory"></img>
                        </Link>
                        <a href="https://giphy.com/gifs/spooky-MgRqsW4PKuYTK" target="_blank">
                            <img src={require('../../images/icon_JI.png')} alt="Job Information"></img>
                        </a>
                    </div>
                    <Link to="/"><button type="button" className="btn btn-info returnHome">Home</button></Link>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const question = state.questions;
    return {
        question: question
    }
}

export default connect(mapStateToProps,{
    getQuestions,
    getResponses,
    getAllQuizzes
})(Quiz);
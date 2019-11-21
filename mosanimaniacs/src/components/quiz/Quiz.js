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
    // componentDidReceiveProps() {
    //     this.setState({
    //         questionId: this.props.question._id
    //     })
    // }

    showHideStart() {
        const courseButton = getComputedStyle(this.CourseBtn.current);
        const courseStart = getComputedStyle(this.CourseStart.current);
        // if (courseStart.style.display === '') {
        //     console.log('no show');
        // } else {
        //     console.log(courseStart.style.display);
        // }
        // console.log(courseStart.display);
        courseStart.display = 'block';
    }

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
                    <Link to="/quiz/dct" className="course-button" onClick={() => {
                        // this.props.getQuestions('/api/questions');
                        // this.props.getResponses('/api/questions');
                        this.props.getAllQuizzes('/api/quizzes');
                    }}>
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
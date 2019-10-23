import React, { Component } from "react";
import { connect } from "react-redux";
//import {getQuestions} from '../../redux/actions/index';

class Question extends Component {

    // componentWillMount() {
    //     console.log(this.props.questions);
    // }

    render() {
        if (this.props.questions) {
            console.log(this.props.questions[0]);
        }
        //const getQuestions = bindActionCreators(ActionCreators.getQuestions, dispatch);
        return (
            <div>
                <button>Oh hai Mark</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const questions = state.questions.data;
    return {
        questions: questions
    }
}

export default connect(mapStateToProps)(Question);
import React, { Component } from "react";
import { connect } from "react-redux";
import {getQuestions} from '../../redux/actions/index';

class Question extends Component {
    render() {
        //const getQuestions = bindActionCreators(ActionCreators.getQuestions, dispatch);
        return (
            <div>
                <button onClick={() => this.props.getQuestions('/api/users')}>Oh hai Mark</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}

export default connect(mapStateToProps,{
    getQuestions
})(Question);
import { combineReducers } from 'redux';
import { questions } from '../actions/types';

const INITIAL_STATE = {
    welcome: 'Hello World',
    questions: '',
    selectedQuestion: '',
    selectedQuestionIndex: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case questions.GETQUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case questions.NEXTQUESTION:
            return {
                ...state,
                selectedQuestionIndex: state.selectedQuestionIndex + action.payload
            }
        default:
            return state;
    }
}
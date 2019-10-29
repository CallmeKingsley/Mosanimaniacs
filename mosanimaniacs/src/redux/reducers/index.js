import { combineReducers } from 'redux';
import { questions } from '../actions/types';

const INITIAL_STATE = {
    welcome: 'Hello World',
    questions: '',
    selectedQuestion: '',
    selectedQuestionIndex: 0,
    responses: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case questions.GETQUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case questions.CHANGEQUESTION:
            return {
                ...state,
                selectedQuestionIndex: state.selectedQuestionIndex + action.payload
            }
        case questions.UPDATEATTEMPT:
            const recordedAttempt = {...state.questions.data[state.selectedQuestionIndex]};
            recordedAttempt.attempted = action.payload.attempt;
            recordedAttempt.correct = action.payload.answer;
            return {
                ...state,
                // questions: {
                //     ...state.questions.data.slice(0, state.selectedQuestionIndex),
                //     recordedAttempt,
                //     ...state.questions.data.slice(state.selectedQuestionIndex+1)
                // }
                responses: {
                    ...state.responses.slice(0, state.selectedQuestionIndex),
                    ...recordedAttempt,
                    ...state.responses.slice(state.selectedQuestionIndex+1)
                }
            }
        default:
            return state;
    }
}
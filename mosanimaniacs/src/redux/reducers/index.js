import { questions, score } from '../actions/types';

const INITIAL_STATE = {
    questions: ''
};

export default function UpdateQuestion(state = INITIAL_STATE, action) {
    switch (action.type) {
        case questions.GETQUESTIONS:
            return {
                ...state,
                questions: action.payload.data
            }
        default:
            return state;            
    }
}

import { quizzes, score } from '../actions/types';

const INITIAL_STATE = {
    quizzes: []
};

export default function GetQuizzes(state = INITIAL_STATE, action) {
    switch (action.type) {
        case quizzes.GETALLQUIZZES:
            return {
                ...state,
                quizzes: action.payload.data
            }
        default:
            return state;            
    }
}

import { questions, score } from '../actions/types';

const INITIAL_STATE = {
    selectedQuestion: '',
    selectedQuestionIndex: 0,
    responses: '',
    points: 0
}

export default function NewQestion(state = INITIAL_STATE, action) {
    switch (action.type) {
        case questions.GETQUESTIONS:
            return {
                ...state,
                responses: action.payload.data.questions
            }
        case questions.UPDATEATTEMPT:
            return {
                ...state,
                responses: state.responses.map((question, index) => {
                    if (index === action.payload.index) {
                        return {
                            ...question,
                            Attempted: action.payload.attempt,
                            Correct: action.payload.answer,
                            Points: action.payload.points
                        }
                    }
                    return question;
                })
            }       
        case questions.CHANGEQUESTION:
            console.log(state.selectedQuestionIndex + action.payload);
            return {
                ...state,
                selectedQuestionIndex: state.selectedQuestionIndex + action.payload
            }
        case score.UPDATESCORE:
            return {
                ...state,
                points: state.points + action.payload
            }
        default:
            return state;
    }
}
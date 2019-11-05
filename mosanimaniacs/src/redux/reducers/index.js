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
        // case questions.UPDATEATTEMPT:
        //     return state.questions.map((question, index) => {
        //         if (index === action.payload.index) {
        //             return {
        //                 ...question,
        //                 Attempted: action.payload.attempt,
        //                 Correct: action.payload.answer
        //             }
        //         }
        //         return question;
        //     });
            //{
                // ...state,
                // questions: {
                //     data: {
                        
                //     }
                    //state.questions.data.slice(0, state.indexMinusOne),
                    //state.questions.data.slice(state.selectedQuestionIndex)
                // }
                // responses: {
                //     ...state.responses.slice(0, state.selectedQuestionIndex),
                //     ...recordedAttempt,
                //     ...state.responses.slice(state.selectedQuestionIndex+1)
                // }
        default:
            return state;            
    }
}

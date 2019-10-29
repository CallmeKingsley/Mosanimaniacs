import axios from "axios";
import { questions } from './types';

const config = {
    withCredentials: true
}

const ax = axios.create(config);

export const getQuestions = url => async (dispatch) => {
    try {
        const response = await ax.get(url);
        dispatch({type: questions.GETQUESTIONS, payload: response});
    }
    catch (error) {
        console.log(error);
    }
}

export const changeQuestion = num => dispatch => {
    dispatch({type: questions.CHANGEQUESTION, payload: num})
}

export const updatePlayerAttempts = (attempt, answer) => dispatch => {
    console.log(attempt, answer);
    dispatch({type: questions.UPDATEATTEMPT, payload: {attempt, answer}});
}
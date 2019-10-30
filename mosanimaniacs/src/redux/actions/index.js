import axios from "axios";
import { questions, score } from './types';

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

export const getResponses = url => async (dispatch) => {
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

export const updatePlayerAttempts = (attempt, answer, index) => dispatch => {
    dispatch({type: questions.UPDATEATTEMPT, payload: {attempt, answer, index}});
}

export const updateScore = points => dispatch => {
    dispatch({type: score.UPDATESCORE, payload: points});
}
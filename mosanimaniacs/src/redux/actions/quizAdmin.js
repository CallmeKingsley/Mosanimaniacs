import axios from "axios";
import { quizzes } from './types';

const config = {
    withCredentials: true
}

const ax = axios.create(config);

export const submitQuiz = (url, response) => (dispatch) => {
    ax.post(url, response)
    .then(res => {
        dispatch({
            type: quizzes.CREATEQUIZ,
            payload: res.config.data
        })
    })
    .catch(err => console.log(err));
}

export const getAllQuizzes = url => async (dispatch) => {
    try {
        const response = await ax.get(url);
        dispatch({type: quizzes.GETALLQUIZZES, payload: response});
    }
    catch (error) {
        console.log(error);
    }
}

export const updateQuiz = (url, response) => dispatch => {
    ax.post(url, response)
        .then(res => {
            console.log(res.config.data);
            dispatch({
                type: quizzes.UPDATEQUIZ,
                payload: res.config.data
            })
        })
        .catch(err => console.log(err));
}
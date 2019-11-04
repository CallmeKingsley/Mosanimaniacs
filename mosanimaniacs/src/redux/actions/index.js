import axios from "axios";
import { questions, score, responses } from './types';

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

export const postResponses = (url,response) => dispatch => {
    console.log(url, response);
    // try {
    //     const studentResponses = await ax.post(url,{response});
    //     dispatch({type: responses.POSTRESPONSES, payload: studentResponses});

    // }
    // catch (error) {
    //     console.log(error);
    // }
    // return (dispatch) => {
    //     dispatch({type: responses.POSTRESPONSES});
    //     ax.post(url, response)
    //     .then(response => {
    //         dispatch({
    //             type: response.POSTRESPONSES,
    //             payload: response
    //         })
    //         console.log(response);
    //     })
    //     .catch(error => console.log(error));
    // }
    ax.post(url, response)
        .then(res => {
            dispatch({
                type: responses.POSTRESPONSES,
                payload: res.data
            })
        })
}

export const changeQuestion = num => dispatch => {
    dispatch({type: questions.CHANGEQUESTION, payload: num})
}

export const updatePlayerAttempts = (attempt, answer, index, points) => dispatch => {
    dispatch({type: questions.UPDATEATTEMPT, payload: {attempt, answer, index, points}});
}

export const updateScore = points => dispatch => {
    dispatch({type: score.UPDATESCORE, payload: points});
}
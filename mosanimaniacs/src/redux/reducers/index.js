import { combineReducers } from 'redux';
import { welcome } from '../action/types';

const INITIAL_STATE = {
message: 'Hello World'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
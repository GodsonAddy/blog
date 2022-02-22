import {REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOADING, USER_LOADED, AUTH_ERROR, LOGOUT } from '../actions/types';


const initialState = {
    userAuth: null,
    token: localStorage.getItem('token'),
    user: null,
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING: 
            return {
                ...state,
                loading: true
            };
        case USER_LOADED: 
            return {
                ...state,
                userAuth: true,
                loading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token) 
            return {
                ...state,
                userAuth: true,
                ...action.payload,
                loading: false
            };
        case LOGIN_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                userAuth: false,
                token: null,
                user: null,
                loading: false
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token) 
            return {
                ...state,
                userAuth: true,
                ...action.payload,
                loading: false
            };
        case REGISTER_FAILURE:
            localStorage.removeItem('token')
            return {
                ...state,
                userAuth: false,
                token: null,
                user: null,
                loading: false
            };
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                userAuth: false,
                token: null,
                user: null,
                loading: false
            };
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                userAuth: false,
                token: null,
                user: null,
                loading: false
            };
        default: 
            return state
    }
}


export default userReducer; 
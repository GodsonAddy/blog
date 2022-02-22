import {
    USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, 
    LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, LOGOUT
} from "./types";
import axios from 'axios';
import {registerError} from './errorAction';


export const getUser = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })

    

    try {
        const res = await axios.get('http://localhost:5000/api/auth/users', authenticate(getState))
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }
    catch(err) {
        console.log(err);
        //dispatch(registerError(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
        
    }
}

export const authenticate = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config

}

export const register = ({first_name, last_name, email, password}) => async (dispatch) =>  {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({first_name, last_name,email, password})
     
    try{

        console.log("body from register", body)
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config)
        console.log('register', res);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

      
        localStorage.setItem("isAuthenticated", "true");
        
        window.location.pathname = "/"
     
    } catch(err) {
        console.log(err.response.data.error);
        //const errorMsg = (err.response && err.response.data && err.response.data.error) || err.errorMsg || err.toString();
        dispatch(registerError(err.response.data, err.response.status, 'REGISTER_FAILURE'));
        dispatch({
            type: REGISTER_FAILURE
        });
        
        
        
        return Promise.reject()
    }
}

export const login = ({email, password}) => async (dispatch) =>  {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})
     
    try{
        const res = await axios.post('http://localhost:5000/api/auth/login', body, config)
        console.log('login', res);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        let loginInfo = {
            "username": res.data.username,
            "email": res.data.email
        };
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loginInfo",  JSON.stringify(loginInfo));
        window.location.pathname = "/"
    }
   
    catch(err) {
        console.log(err.response.data.error);
        //const errMsg = (err.response && err.response.data && err.response.data.error) || err.errMsg || err.toString();
        dispatch({
            type: LOGIN_FAILURE
        })
        dispatch(registerError(err.response.data, err.response.status, 'LOGIN_FAILURE'));
        return Promise.reject()
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}
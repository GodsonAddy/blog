import {combineReducers} from 'redux';
import blogReducer from './blogReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import LoginErrors from './errorReducer';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["blogs"]
}

const rootReducer = combineReducers ({
    blogs: blogReducer,
    loginAuth: userReducer,
    errorAuth: LoginErrors
})

export default persistReducer(persistConfig, rootReducer);
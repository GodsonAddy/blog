import { CLEAR_ALL, ERROR_MESSAGE } from "../actions/types";


const initialState = {
   validator: {},
   status: null,
   id: null 
};


const LoginErrors = (state = initialState, action) => {
    switch(action.type) {
        
        case ERROR_MESSAGE: 
        return {
            validator: action.payload.validator,
            status: action.payload.status,
            id: action.payload.id
        };
        case CLEAR_ALL: 
            return {
                validator: {},
                id: null,
                status: null
            };
        default :
            return state
        
    }
}

export default LoginErrors;
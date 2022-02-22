import { CLEAR_ALL, ERROR_MESSAGE } from "./types";



export const registerError = (validator, status, id = null) => {
    return {
        type: ERROR_MESSAGE,
        payload: {validator, status, id}
    }
}

export const errorDeleted = () => {
    return {
        type: CLEAR_ALL
    }
}
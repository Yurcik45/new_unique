import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    SHOPIFY_AUTH_SUCCESS,
    SHOPIFY_AUTH_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL
} from '../actions/types'

const initialState = {
    loggedIn: false,
    user: {},
    tokenIsRefreshing: false,
    error: ""
};


const loginReducer = (state= initialState, action) => {
    // console.log('LOGGED_USER', state)

    switch (action.type) {
        case SIGN_IN_SUCCESS :
            return {
                ...state,
                loggedIn: true,
            }
        case SIGN_IN_FAIL :
            return {
                ...state,
                loggedIn: false,
                error: action.payload,
            }

        case GET_USER_SUCCESS :
            return {
                ...state,
                user: action
            }
        case GET_USER_FAIL :
            return {
                ...state,
                user: []
            }
        case GOOGLE_AUTH_SUCCESS :
            return {
                ...state,
                loggedIn: true
            }
        case GOOGLE_AUTH_FAIL :
            return {
                ...state,
                loggedIn: false
            }
        case SHOPIFY_AUTH_SUCCESS :
            return {
                ...state,
                loggedIn: true
            }
        case SHOPIFY_AUTH_FAIL :
            return {
                ...state,
                loggedIn: false
            }
        case FORGOT_PASSWORD_SUCCESS :
        case FORGOT_PASSWORD_FAIL :
        case RESET_PASSWORD_SUCCESS :
        case RESET_PASSWORD_FAIL :
        default:
            return state;
    }
};

export default loginReducer;


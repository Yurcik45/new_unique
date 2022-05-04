import {
    // UPLOAD_IMAGE_SUCCESS,
    // UPLOAD_IMAGE_FAIL,
    // CREATE_IMAGE_SUCCESS,
    // CREATE_IMAGE_FAIL,
    GET_IMAGES_SUCCESS,
    GET_IMAGES_FAIL,
    SHOPIFY_GET_IMAGES_SUCCESS,
    SHOPIFY_GET_IMAGES_FAIL,
    // GET_IMAGE_SUCCESS,
    // GET_IMAGE_FAIL,
    // UPDATE_IMAGE_SUCCESS,
    // UPDATE_IMAGE_FAIL,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    // SCAN_IMAGE_SUCCESS,
    // SCAN_IMAGE_FAIL
} from '../actions/types'

const initialState = {
    images: [],
    shopifyImages: [],
    error: {}
};

console.log("IMAGES INITIAL STATE", initialState);

const images = (state= initialState, action) => {

    switch (action.type) {
        // case UPLOAD_IMAGE_SUCCESS:
        // case UPLOAD_IMAGE_FAIL:
        // case CREATE_IMAGE_SUCCESS :
        //     return {
        //         ...state,
        //         images: [...state.images, action.payload],
        //     }
        // case CREATE_IMAGE_FAIL:
        //     return {
        //         ...state
        //     }
        case GET_IMAGES_SUCCESS :
            return {
                ...state,
                images: [...action.payload],
            }
        case GET_IMAGES_FAIL:
            return {
                ...state
            }
        case SHOPIFY_GET_IMAGES_SUCCESS :
            return {
                ...state,
                shopifyImages: {...action.payload},
            }
        case SHOPIFY_GET_IMAGES_FAIL:
            return {
                ...state,
                error: action.payload.response
            }
        case DELETE_IMAGE_SUCCESS:
            return {
                ...state,
                images: state.images.filter( image => image.id !== action.payload.id )
            }
        case DELETE_IMAGE_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default images;


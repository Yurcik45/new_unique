import axios from "axios";
import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    CREATE_IMAGE_SUCCESS,
    CREATE_IMAGE_FAIL,
    GET_IMAGES_SUCCESS,
    GET_IMAGES_FAIL,
    GET_IMAGE_SUCCESS,
    GET_IMAGE_FAIL,
    SHOPIFY_GET_IMAGES_SUCCESS,
    SHOPIFY_GET_IMAGES_FAIL,
    UPDATE_IMAGE_SUCCESS,
    UPDATE_IMAGE_FAIL,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAIL,
    SCAN_IMAGE_SUCCESS,
    SCAN_IMAGE_FAIL
} from './types';
import {checklogin} from "../checkLogin"
import {server} from "../serverLink"

export const uploadFiles = (files) => dispatch => {

    files.map( file => {

        const formData = new FormData();

        const config = {headers: {"accept": "application/json", "Content-Type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
        const body = formData
        const requestUrl = `${server}api/v1/image/upload-image/`

        formData.append("type", file.meta.type);
        formData.append("file", file.file);
        axios.post(requestUrl, body, config)
            .then(function (response) {
                dispatch({type: UPLOAD_IMAGE_SUCCESS, payload: response.data})
                dispatch(createImage(
                    {
                        url: response.data.file_url,
                        title: file.file.name,
                        tags: [
                            {
                                text: "Uploaded From a Local Computer"
                            }
                        ],
                    }
                ));
            })
            .catch(function (error) {
                dispatch({type: UPLOAD_IMAGE_FAIL, payload: error})
                checklogin(error)
            })
        })
}


export const createImage = (image) => dispatch => {

    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const body = JSON.stringify(image)
    const requestUrl = `${server}api/v1/image`

    axios.post(requestUrl, body, config)
        .then(function (response) {
            dispatch({type: CREATE_IMAGE_SUCCESS, payload: response.data})
            dispatch(scanImage(response.data.id))
        })
        .catch(function (error) {
            dispatch({type: CREATE_IMAGE_FAIL, payload: error})
            checklogin(error)
        });
}

export const getImages = (skip = 0, limit = 100) => dispatch => {

    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/image/?skip=${skip}&limit=${limit}`

    axios.get(requestUrl, config)
        .then(function (response) {
            dispatch({type: GET_IMAGES_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: GET_IMAGES_FAIL, payload: error})
            checklogin(error)
        });
}

export const getImage = (id) => dispatch => {
    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/image/${id}`

    axios.get(requestUrl, config)
        .then(function (response) {
            dispatch({type: GET_IMAGE_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: GET_IMAGE_FAIL, payload: error})
            checklogin(error)
        });

}

export const updateImage = (id) => dispatch => {
    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/image/${id}`

    axios.put(requestUrl, config)
        .then(function (response) {
            dispatch({type: UPDATE_IMAGE_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: UPDATE_IMAGE_FAIL, payload: error})
            checklogin(error)
        });

}

export const scanImage = (id) => dispatch => {

    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/scan/${id}`
    const body = JSON.stringify(id)

    axios.post(requestUrl, body, config)
        .then(function (response) {
            dispatch({type: SCAN_IMAGE_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: SCAN_IMAGE_FAIL, payload: error})
            checklogin(error)
        });
}

export const deleteImage = (id) => dispatch => {
    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/image/${id}`

    axios.delete(requestUrl, config)
        .then(function (response) {
            dispatch({type: DELETE_IMAGE_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: DELETE_IMAGE_FAIL, payload: error})
            checklogin(error)
        });
}

export const shopifyGetImage = () => dispatch => {
    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("shopify_token")}`}}
    const requestUrl = `${server}api/v1/shopify/getimages`

    axios.get(requestUrl, config)
        .then(function (response) {
            dispatch({type: SHOPIFY_GET_IMAGES_SUCCESS, payload: response.data})

        })
        .catch(function (error) {
            dispatch({type: SHOPIFY_GET_IMAGES_FAIL, payload: error})
            console.log("SHOPIFY_GET_IMAGES_FAIL", error);
        });
}
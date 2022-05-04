import {
    GET_MATCHES_SUCCESS,
    GET_MATCHES_FAIL
} from './types'
import axios from "axios";
import {checklogin} from "../checkLogin"
import {server} from "../serverLink"

const date = new Date()

export const getMatches = (
    skip = 0,
    limit = 100,
    startDate =  date, //'2021-02-12T15:35:50.272Z',
    endDate =  date, //'2021-02-12T15:35:50.272Z',
    reported = true,
    flagged = true,
    unseen = true,
    online = true,
    sent_warning_email = true,
    false_positive = true,
    similarity_pct__gte = 0,
    violator_id = 0
    ) => dispatch => {

    const config = {headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}}
    const requestUrl = `${server}api/v1/match/?skip=${skip}&limit=${limit}&start_date=${startDate}&end_date=${endDate}&reported=${reported}&flagged=${flagged}&unseen=${unseen}&online=${online}&sent_warning_email=${sent_warning_email}&false_positive=${false_positive}&similarity_pct__gte=${similarity_pct__gte}&violator_id=${violator_id}`


    axios.get(requestUrl, null, config)
        .then(function (response) {
            dispatch({type: GET_MATCHES_SUCCESS, payload: response.data})
        })
        .catch(function (error) {
            dispatch({type: GET_MATCHES_FAIL, payload: error})
            checklogin(error)
        });


}
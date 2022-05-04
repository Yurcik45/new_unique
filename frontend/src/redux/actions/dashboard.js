import axios from "axios";
import {
    GET_DASHBOARD_DATA_SUCCESS,
    GET_DASHBOARD_DATA_FAIL,
} from './types';
import {checklogin} from "../checkLogin"
import {server} from "../serverLink"

export const getDashboardData = (startDate, endDate) => dispatch => {

    const requestUrl =  `${server}api/v1/dashboard/dashboard-data`
    const params = ({start_date: startDate, end_date: endDate})

    axios.get(
        requestUrl,
        {
            params,
            headers: {
                "accept": "Application/json",
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(function (response) {
            dispatch({type: GET_DASHBOARD_DATA_SUCCESS, payload: response.data})
            console.log("GET_DASHBOARD_DATA_SUCCESS", response.data);
        })
        .catch(function (error) {
            dispatch({type: GET_DASHBOARD_DATA_FAIL, payload: error})
            console.log("GET_DASHBOARD_DATA_FAIL", error.response);
            checklogin(error)
        })
}
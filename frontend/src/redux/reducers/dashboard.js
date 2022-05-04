import {
    GET_DASHBOARD_DATA_SUCCESS,
    GET_DASHBOARD_DATA_FAIL
} from '../actions/types'

const initialState = {
    online_matches_number: 0,
    removed_matches_number: 0,
    reported_matches_number: 0,
    small_violators_number: 0,
    middle_violators_number: 0,
    big_violators_number: 0,
    little_plagiated_images_number: 0,
    medium_plagiated_images_number: 0,
    very_plagiated_images_number: 0,
    bar_chart_data: {
        label_names: [],
        dates: [],
        group_item_values: []
    }
};

console.log("DASHBOARD INITIAL STATE", initialState);

const dashboard = (state= initialState, action) => {

    switch (action.type) {
        case GET_DASHBOARD_DATA_SUCCESS :
            return {
                ...action.payload
            }
        case GET_DASHBOARD_DATA_FAIL:
        default:
            return state;
    }
}

export default dashboard;

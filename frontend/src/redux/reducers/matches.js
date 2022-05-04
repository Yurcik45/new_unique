import {
    GET_MATCHES_SUCCESS,
    GET_MATCHES_FAIL
} from '../actions/types';

const initialState = {
    image_url: "string",
    page_url: "string",
    found_date: "2021-03-10T15:17:12.118Z",
    reported: true,
    flagged: true,
    unseen: true,
    online: true,
    sent_warning_email: true,
    false_positive: true,
    similarity_pct: 0,
    id: 0,
    original_image: {
        url: "string",
        active: true,
        title: "string",
        sensitivity: 0,
        scans_completed: 0,
        tags: [
            {
                text: "string",
                id: 0
            }
        ],
        id: 0,
        user_id: "string"
    },
    violator: {
        platform: "UNDEFINED",
        isp: "UNDEFINED",
        email: "user@example.com",
        domain: "string",
        found_date: "2021-03-10T15:17:12.118Z",
        id: 0
    }
}

console.log("MATCHES INITIAL STATE", initialState);


const matches = (state= initialState, action) => {

    switch (action.type) {
        case GET_MATCHES_SUCCESS :
            return {
                matches: [...action.payload],
            }
        case GET_MATCHES_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
};

export default matches;
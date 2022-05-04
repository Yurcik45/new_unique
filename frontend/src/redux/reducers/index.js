import auth from './auth'
import dashboard from './dashboard'
import images from './images'
import matches from './matches'
import {combineReducers} from 'redux'
const rootReducer = combineReducers({
    auth,
    dashboard,
    matches,
    images
})
export default rootReducer
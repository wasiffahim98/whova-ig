import {createStore} from 'redux';
import {combineReducers} from 'redux';
import commentReducers from './reducers/commentReducers';

const inState = {};
const store = createStore(combineReducers({comment: commentReducers,}), inState,);
export default store;
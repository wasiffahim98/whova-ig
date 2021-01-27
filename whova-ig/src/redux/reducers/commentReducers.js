import {ADD_COMMENT, GET_ALL_COMMENTS, REPLY_TO_COMMENT, LIKE_COMMENT, LIKE_REPLY} from '../actions/types';

const inState = {
    comList: [],
}
export default function(state = inState, action){
    switch(action.type){
        case ADD_COMMENT:
            return{
                ...state,
                comList: action.payload
            }
        case GET_ALL_COMMENTS:
            return{
                comList: action.payload
            }
        case REPLY_TO_COMMENT:
            return{
                comList: action.payload
            }
        case LIKE_REPLY:
            return{
                comList: action.payload
            }
        case LIKE_COMMENT:
            return{
                comList: action.payload
            }
        default:
            return state;
    }
}
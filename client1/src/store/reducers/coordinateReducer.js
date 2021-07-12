import { GET_LAT_LONG, SET_ERROR } from "../actions/types";


const initialState = {
    data: null,
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LAT_LONG:
            return {
                data: action.payload,
                error: ''
            }

        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }

}


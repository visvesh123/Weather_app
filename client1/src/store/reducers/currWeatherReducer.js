import { GET_CURR_WEATHER, SET_ERROR } from "../actions/types";


const initialState = {
    data: null,
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CURR_WEATHER:
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


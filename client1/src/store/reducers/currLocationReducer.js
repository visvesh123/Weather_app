import { CURR_PLACE,  SET_ERROR } from "../actions/types";


const initialState = {
    data: null,
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CURR_PLACE:
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


import { combineReducers } from 'redux';
import weatherReducer from './currWeatherReducer'
import coordinateReducer from './coordinateReducer';
import loginReducer from './loginReducer';
import currLocationReducer from './currLocationReducer';
import searchCityReducer from './searchCityReducer';

const rootReducer = combineReducers({
    weather: weatherReducer,
    coordinates: coordinateReducer,
    login : loginReducer,
    place : currLocationReducer,
    searchCity : searchCityReducer

})

export default rootReducer;
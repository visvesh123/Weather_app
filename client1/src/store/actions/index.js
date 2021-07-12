import { CURR_PLACE, GET_CURR_WEATHER,  LOGIN_TYPE, SET_ERROR  , SEARCH_CITY} from "./types";
import { openweatherapi_key, coordinateapi_key } from '../../../config.json'
import web from "./web";
import axios from "axios";


// export const fetchCurrentWeather = ({ lat, long }) => async (dispatch, getState) => {
 
//     dispatch({ type: GET_CURR_WEATHER, payload: response.data });
//     // console.log(response.data)
// };


// export const fetchCordinates = ({ place }) => async (dispatch, getState) => {
//     const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${coordinateapi_key}`)
//     dispatch({ type: GET_LAT_LONG, payload: response.data });
//     // console.log(response.data)
// };

export const fetchWeatherData = (place)=> async (dispatch , getState)=> {
    const response = await axios.get(`http://localhost:4000/weather/${place}`)
    dispatch({type : GET_CURR_WEATHER , payload : response.data})
    // console.log(response.data)
}

export const fetchWeatherDataWithCoordinates = (lat,long)=> async (dispatch , getState)=> {
    try{
        const response = await axios.get(`http://localhost:4000/weather/${lat}/${long}`)
        dispatch({type : GET_CURR_WEATHER , payload : response.data})
        // console.log(response.data)
    }catch(err){
        console.log(err)
    }

}
export const fetchPlaceDataWithCoordinates = (lat,long)=> async (dispatch , getState)=> {
    try{
        const response = await axios.get(`http://localhost:4000/place/${lat}/${long}`)
        dispatch({type : CURR_PLACE , payload : response.data})
        // console.log(response.data)
    }catch(err){
        console.log(err)
    }

}



export const loginDetails = (data)=>{
    return {
        type : LOGIN_TYPE,
        payload : {
            data : data
        }

    }
}

export const searchCity = (city)=>{
    return {
        type : SEARCH_CITY,
        payload : {
            data : city
        }

    }
}


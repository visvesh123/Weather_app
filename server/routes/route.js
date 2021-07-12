const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const router = express.Router();
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);



async function getWeather(req, res, next) {
  try {
    console.log("Fetching Long Lat...");
    const { cityname } = req.params;
    const cord_response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${cityname}&key=${process.env.coordinateapi_key}`
    );
    const data = await cord_response.json();
    const place = data.results[0].formatted
    const lat = data.results[0].geometry.lat
    const lng = data.results[0].geometry.lng
    
    console.log("Fetching weather")

    const weather_response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.openweatherapi_key}&exclude=minutely,daily,alerts`
      );

      const weather_data = await weather_response.json();
     client.setex(cityname, 3600 , JSON.stringify(weather_data))
      res.send(JSON.stringify(weather_data))


  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

function cache(req,res,next){
    client.get(req.params.cityname, (err, data) => {
        if (err) throw err;
    
        if (data !== null) {
          res.send(data);
        } else {
          next();
        }
      });
}

router.get("/weather/:cityname", cache , getWeather);

module.exports = router;

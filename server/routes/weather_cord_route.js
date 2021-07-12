const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const router = express.Router();
// const REDIS_PORT = process.env.PORT || 6379;
// const client = redis.createClient(REDIS_PORT);



async function getWeatherWithCoord(req, res, next) {
  try {

    

    
    console.log("Fetching weather by coord")

    const weather_response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.long}&appid=${process.env.openweatherapi_key}&exclude=minutely,daily,alerts`
      );

      const weather_data = await weather_response.json();
    //  client.setex(cityname, 3600 , JSON.stringify(weather_data))
      res.send(JSON.stringify(weather_data))


  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

// function cache(req,res,next){
//     client.get(req.params.cityname, (err, data) => {
//         if (err) throw err;
    
//         if (data !== null) {
//           res.send(data);
//         } else {
//           next();
//         }
//       });
// }

router.get("/weather/:lat/:long",  getWeatherWithCoord);

module.exports = router;

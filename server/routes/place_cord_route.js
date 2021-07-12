const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const router = express.Router();
// const REDIS_PORT = process.env.PORT || 6379;
// const client = redis.createClient(REDIS_PORT);



async function getPlaceWithCoord(req, res, next) {
  try {

    

   console.log("Fetching Place  by coordinates")

    const place_response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${req.params.lat}+${req.params.long}&key=1e3b486d68d846b78acfaa2f2192996f`
      );

      const place_data = await place_response.json();
    //  client.setex(cityname, 3600 , JSON.stringify(place_data))
      res.send(JSON.stringify(place_data))


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

router.get("/place/:lat/:long",  getPlaceWithCoord);

module.exports = router;

const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const redis = require("redis");
const cors = require("cors");
const dotenv = require("dotenv");

const schema = require("./schema/schema");
const User = require("./models/User");
const testRoute = require("./routes/route");
const weatherCoord = require('./routes/weather_cord_route')
const placeCoord = require('./routes/place_cord_route')
 


 
dotenv.config();
const app = express();

// console.log(process.env.coordinateapi_key);

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

app.use(cors());

app.use(testRoute);
app.use(weatherCoord);
app.use(placeCoord)
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log("Connected to database cluster");
  });
} catch (err) {
  console.log(err);
}

// User.create({
//     name : "Visvesh",
//     email : "dv",
//     password : "12"
// })


app.listen(4000, () => {
  console.log("Connected on port 4000");
});

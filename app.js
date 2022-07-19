const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const app = express();

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require("./api/models");
const dbConfig = require("./api/config/db.config");
db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.cluster}.mongodb.net/${dbConfig.dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connection made");
  })
  .catch((err) => {
    console.log("DB Connection error", err);
  });

require("./api/routes/vehicle.routes")(app);
require("./api/routes/user.routes")(app);
require("./api/routes/testdrives.routes")(app);
require("./api/routes/inventory.routes")(app);
require("./api/routes/rental.routes")(app);
require("./api/routes/accessory.routes")(app);
require("./api/routes/customerService.routes")(app);
require("./api/routes/tradein.routes")(app);
require("./api/routes/dealerService.routes")(app);

module.exports = app;

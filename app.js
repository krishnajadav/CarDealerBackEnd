const express = require('express');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require("./api/models");
const dbConfig = require("./api/config/db.config");
db.mongoose
    .connect(`mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.cluster}.mongodb.net/${dbConfig.dbname}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
require('./api/routes/user.routes')(app);
require('./api/routes/testdrives.routes')(app);
require('./api/routes/inventory.routes')(app);
require('./api/routes/accessory.routes')(app);

module.exports = app;

const controller = require("../controllers/vehicles.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/vehicle", controller.form);
    
    app.get("/api/getVehicle", controller.getVehicle);

};
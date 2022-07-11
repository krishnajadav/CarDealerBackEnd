const controller = require("../controllers/TestDriveController");

module.exports = function(app) {
    
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
  
    app.get("/api/testdrives/appointments", controller.getAllAppointments);
    app.get("/api/testdrives/appointments/:userid", controller.getAppointmentsForUser);
    app.get("/api/testdrives/timeslots", controller.getAllTimeslots);
    app.post("/api/testdrives/appointments/:userid", controller.bookAppointment);
    app.delete("/api/testdrives/appointments/cancel/:appointmentid", controller.cancelAppointment);

};

// Author: Tuan Hamid
const controller = require("../controllers/user.controller");
const { authorization } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/user/register", [authorization.checkUserDuplicate] ,controller.register
    );
    app.post("/api/user/login", controller.login);
    app.put("/api/user/updatepassword", controller.updatePassword);
    app.put("/api/user/updatestatus", controller.updateStatus);
    app.get("/api/user/employees", controller.findAllEmployees);
    app.post("/api/user/resetpassword", controller.resetPasswordByEmail);

};

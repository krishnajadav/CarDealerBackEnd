// Author: Tuan Hamid
const controller = require("../controllers/accessory.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/accessory/create", controller.create);
    app.put("/api/accessory/:id", controller.update);
    app.delete("/api/accessory/:id", controller.remove);
    app.get("/api/accessory/:id", controller.findById);
    app.get("/api/accessory/category/:id", controller.findByCategory);

};

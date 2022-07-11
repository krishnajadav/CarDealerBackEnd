const controller = require("../controllers/inventory.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/inventory/add", controller.add);
    app.get("/api/inventory/get", controller.get);
    app.put("/api/inventory/update/:id", controller.update);
    app.delete("/api/inventory/delete/:id", controller.delete);
};

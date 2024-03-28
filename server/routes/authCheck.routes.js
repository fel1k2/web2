//const controller = require("../controllers/auth.controller");

const middlewares = require("../middlewares/auth.middleware");

module.exports = function (app) {
    app.get("/auth/requireAuth", [middlewares.verifyToken], (req, res) => {
        res.status(200).send("requireAuth route")
    });
    app.get("/auth/notRequireAuth", (req, res) => {
        res.status(200).send("notRequireAuth route")
    });
}
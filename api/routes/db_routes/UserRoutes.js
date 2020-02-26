var db = require("../../../models/index");

module.exports = function (app) {

    // this route finds one user by email address //
    app.get("/api/user/:email", function (req, res) {
        db.User.findOne({
            where: {
                email: req.params.email
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // this route creates a new user //
    app.post("/api/user", function (req, res) {
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });


};
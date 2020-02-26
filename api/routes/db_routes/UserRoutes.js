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

    // this is the route to delete a user //
    app.delete("/api/user/:id", function (req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });

    // this route updates the user //
    app.put("/api/user", function (req, res) {
        db.User.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });


};
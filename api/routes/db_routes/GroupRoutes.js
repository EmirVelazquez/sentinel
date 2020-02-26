var db = require("../../../models/index");

module.exports = function (app) {

    //this route finds all the groups for a users with the same group id //
    app.get("/api/group/user/:UserId", function (req, res) {
        db.Group.findAll({
            where:
            {
                UserId: req.params.UserId
            }
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //find one group by id //
    app.get("/api/group/:Id", function (req, res) {
        db.Group.findOne({
            where: {
                Id: req.params.Id
            }
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    // this route deletes a group by id
    app.delete("/api/group/:id", function (req, res) {
        db.Group.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

    //this route creates a new group //
    app.post("/api/group", function (req, res) {
        db.Group.create(req.body).then(function (newGroup) {
            res.json(newGroup);
        });
    });

    // this route updates a group //
    app.put("/api/group", function (req, res) {
        db.Group.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function (dbGroup) {
            res.json(dbGroup);
        });
    });

};
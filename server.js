require("dotenv").confing();
const express = require("express");
const db = require("");
// const keys = require("./keys");
const routes = require("./Routes");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);


// if exteded = true the database will get reset every time its initialized
// clearing the test db
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// starting the server, syncing our models
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT
        );
    });
});

module.exports = app;

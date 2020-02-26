// Used to hide keys
require("dotenv").config();

// Used to create http errors
const createError = require('http-errors');

// Used to create server
const express = require("express");

// Enables cross origin resource sharing
const cors = require('cors');

// Used to parse HTTP request cookies
const cookieParser = require('cookie-parser');

// Used to log server requests
const logger = require('morgan');

// 
const db = require("../models/index");

// const keys = require("./keys");

// Initializing the server
const app = express();

// Setting the server port - must be different then what's used on the front end
const PORT = process.env.PORT || 5000;

// require('./routes/apiRoutes')(app);

// require('./routes/htmlRoutes')(app);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static('public'));
// app.use(logger('combined'));
// app.use(cors());
// app.use(cookieParser());

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
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

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const assets = require('./assets.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

assets.forEach(assetDir => {
    app.use('/' + assetDir, express.static(assetDir));
});

routes.forEach(route => {
    app.get('/' + route, function(req, res, next) {
        res.render(route, {});
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('404');
});

module.exports = app;

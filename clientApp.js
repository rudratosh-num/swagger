var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { checkTokenClient } = require('./utils/tokenMiddleware')
const { clientRouter, clientRouterLogged } = require('./routes/clientRouter');
const createDir = require('./utils/createFolder')

var app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/client', clientRouter);
app.use('/logged/client', checkTokenClient, clientRouterLogged);

module.exports = app;

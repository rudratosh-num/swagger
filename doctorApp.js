var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { checkTokenDoctor } = require('./utils/tokenMiddleware')
const { doctorRouter, loggedDoctorRouter } = require('./routes/doctorRouter')
const { hospitalRouterLogged } = require('./routes/hospitalRouter')
const { offerRouterLogged } = require('./routes/offerRouter');
const createDir = require('./utils/createFolder')

var app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/doctor', doctorRouter);

app.use('/logged/doctor', checkTokenDoctor, loggedDoctorRouter);
app.use('/logged/hospital', checkTokenDoctor, hospitalRouterLogged);
app.use('/logged/offer', checkTokenDoctor, offerRouterLogged);

module.exports = app;

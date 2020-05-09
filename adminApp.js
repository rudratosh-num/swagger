var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { checkTokenAdmin } = require('./utils/tokenMiddleware')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const { commonRouterLogged } = require('./routes/commonRouter')
const { insuranceRouterLogged } = require('./routes/insuranceCompanyRouter')
const { userRouter, userRouterLogged } = require('./routes/userRouter')
const { doctorRouter, loggedDoctorRouter } = require('./routes/doctorRouter')
const { hospitalRouterLogged } = require('./routes/hospitalRouter')
const { offerRouterLogged } = require('./routes/offerRouter');
const { clientRouter, clientRouterLogged } = require('./routes/clientRouter');
const {
  permissionRouterLogged ,
  roleRouterLogged,
  roleAccessRouterLogged
} = require('./routes/permissionRouter')
const createDir = require('./utils/createFolder')

var app = express()

app.use(fileUpload());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Top Ten Doctors API",
      description: "Top Ten Doctors API Information",
      contact: {
        name: "Backend Developer"
      },
      servers: ["http://localhost:5000"]
    },
  },
  // ['.routes/*.js']
  apis: [
    './swagger/*.js',
    './routes/*.js',
  ],
  swaggerOptions: {
    validatorUrl: null,
    authAction :{ JWT: {name: "JWT", schema: {type: "bearer", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
  },
  explorer: true
};


const swaggerDoc = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


app.use('/user', userRouter)
app.use('/client', clientRouter);
app.use('/doctor', doctorRouter);

app.use('/logged/client', checkTokenAdmin, clientRouterLogged);
app.use('/logged/common', checkTokenAdmin, commonRouterLogged)
app.use('/logged/insurance', checkTokenAdmin, insuranceRouterLogged)
app.use('/logged/doctor', checkTokenAdmin, loggedDoctorRouter);
app.use('/logged/hospital', checkTokenAdmin, hospitalRouterLogged);
app.use('/logged/offer', checkTokenAdmin, offerRouterLogged);
app.use('/logged/user', checkTokenAdmin, userRouterLogged)
app.use('/logged/permission', checkTokenAdmin, permissionRouterLogged)
app.use('/logged/role', checkTokenAdmin, roleRouterLogged);
app.use('/logged/role-access', checkTokenAdmin, roleAccessRouterLogged);

module.exports = app

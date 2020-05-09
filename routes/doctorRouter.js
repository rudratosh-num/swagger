const Router = require ('express')
const bcrypt = require('bcrypt')
const sendMail = require('../utils/email/nodeMailer')
const randomString = require('../utils/randomString')
const ObjectId = require("mongodb").ObjectId
const {
  createDoctor, createDoctorVacation, createAppointment,
  findDoctor, findDoctorVacation, findAppointment,
  updateDoctor, updateDoctorVacation, updateAppointment,
  addResetToken, checkResetToken, deleteResetToken,
  addCategory, removeCategory
} = require('../models/doctorModel')
const { checkUser } = require('../utils/tokenMiddleware')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { validateAuth } = require('../utils/verifyAuthToken')
const { createToken, verifyToken } = require('../utils/token')
const { HasRole } = require('../utils/permissionMiddleware')
const {
  doctor,
  doctorVacation,
  doctorAppointment,
} = require('../utils/collections')

const saltRounds = 10
const doctorRouter = Router()
const loggedDoctorRouter = Router()

/**
 * @swagger
 * path:
 *  /doctor/token:
 *    post:
 *      summary: Use to refresh doctor token
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *        "201":
 *          description: A doctor login response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RefreshTokenResponse'
 */
doctorRouter.post('/token', (req, res)=> verifyToken(req, res, 'doctor') )

/**
 * @swagger
 * path:
 *  /doctor/oauth/{token}/{provider}:
 *    post:
 *      summary: Use to doctor signup via oauth
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *          description: access token from Oauth provider
 *        - in: path
 *          name: provider
 *          schema:
 *            type: string
 *          required: true
 *          description: type of Oauth provider
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorSignup'
 *      responses:
 *        "201":
 *          description: doctor signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorSignupResponse'
 */
doctorRouter.post('/oauth/:token/:provider', async (req, res)=>{
  const data = await validateAuth(req.params.token, req.params.provider)
  if(data){
    await findDoctor({
      email: req.body.email
    }, 0, async (doctor)=>{
      if(doctor && doctor.length>0){
        delete doctor[0].password
        let data = createToken('doctor', doctor[0])
        res.status(200).json({
          ...data,
          status: true,
          message: "login succuss",
          doctor: doctor[0]
        })
      }else{
        await createDoctor({
          ...req.body,
          password: 'no password',
          verified: 1,
        }, (result)=>{
          if(result && result.insertedCount){
            let doctor = result.ops[0]
            delete doctor.password
            let data = createToken('doctor', doctor)
            res.status(200).json({
              ...data,
              status: true,
              message: "login succuss",
              doctor: doctor
            })
          }else{
            res.status(400).json(result)
          }
        }).catch(err=>{
          res.status(400).json({ status: false, message: "something went wrong!"})
        })
      }
    })
  }else {
    res.status(400).json({ status: false, message: "provider token is not verified"})
  }
})

/**
 * @swagger
 * path:
 *  /doctor/signup:
 *    post:
 *      summary: Use to doctor signup
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorSignup'
 *      responses:
 *        "201":
 *          description: doctor signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorSignupResponse'
 */
doctorRouter.post('/signup', (req, res)=>{
  bcrypt.hash(req.body.password, saltRounds, async function (err,   hash) {
    await createDoctor({
      ...req.body,
      display: 0,
      verified: 0,
      password: hash
    }, null, (result)=>{
      if(result && result.insertedCount){
        // sendMail({
        //   to: req.body.email,
        //   subject: 'Email Confirmation',
        //   html: '<h1>Welcome</h1><p>That was easy!</p>'
        // })
        res.status(201).json({ status: true, message: "signup succuss"})
      }else{
        res.status(400).json(result)
      }
    }).catch(err=>{
      res.status(400).json({ status: false, message: "something went wrong!"})
    })
  })
})

/**
 * @swagger
 * path:
 *  /doctor/login:
 *    post:
 *      summary: Use to doctor login
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        "200":
 *          description: doctor login response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorLoginResponse'
 */
doctorRouter.post('/login', async (req, res)=>{
  const { email, password } = req.body
  await findDoctor({
    email: email
  }, 0, (doctor)=>{
    if(doctor && doctor.length>0){
      bcrypt.compare(password, doctor[0].password, function (err, result) {
        if(result == true){
          delete doctor[0].password
          let data = createToken('doctor', doctor[0])
          res.status(200).json({
            ...data,
            status: true,
            message: "login succuss",
            doctor: doctor[0]
          })
        }else{
          res.status(400).json({ status: false, message: "password does not matched!"})
        }
      })
    }else{
      res.status(400).json({ status: false, message: "email or password does not matched!"})
    }
  }).catch(err=>{
    res.status(400).json({ status: false, message: "something went wrong!"})
  })
})

/**
 * @swagger
 * path:
 *  /doctor/search/{skip}:
 *    post:
 *      summary: Use to list or search doctor
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorSignup'
 *      responses:
 *        "200":
 *          description: doctor search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorSignup'
 */
doctorRouter.post('/search/:skip', async (req, res)=>{
  await findDoctor({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/update/{id}:
 *    put:
 *      summary: Use to update doctor by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DoctorSignup'
 *      responses:
 *        "201":
 *          description: doctor response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorUpdateResponse'
 */
loggedDoctorRouter.put('/update/:id', HasRole(doctor, 'update'), async (req, res)=>{
  await updateDoctor(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "doctor updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/confirmation/{id}:
 *    put:
 *      summary: Use confirmation doctor email
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: doctor response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserConfirmResponse'
 */
loggedDoctorRouter.put('/confirmation/:id', async (req, res)=>{
  await updateDoctor(req.params.id, { verified: 1 }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(200).json({ status: true, message: "doctor verified"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /doctor/get/{id}:
 *    post:
 *      summary: Use to get doctor by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *      responses:
 *        "200":
 *          description: doctor search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorSignup'
 */
loggedDoctorRouter.get('/get/:id', async (req, res)=>{
  await findDoctor({ _id: new ObjectId(req.params.id) }, 0, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/delete/{id}:
 *    put:
 *      summary: Use to delete doctor by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: doctor response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DoctorDeleteResponse'
 */
loggedDoctorRouter.put('/delete/:id', HasRole(doctor, 'update'), async (req, res)=>{
  await updateDoctor(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "doctor deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /doctor/forget-password:
 *    post:
 *      summary: Use to doctor forget-password
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgetPassword'
 *      responses:
 *        "200":
 *          description: doctor response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForgetPasswordResponse'
 */
doctorRouter.post('/forget-password', async (req, res)=>{
  await findDoctor({ email: req.body.email }, 0, async (doctor)=>{
    if(doctor && doctor.length>0){
      const token = randomString()
      const payload = {
        doctor_id: new ObjectId(doctor[0]._id),
        token: token
      }
      await addResetToken(payload, (result)=>{
        if(result && result.insertedCount){
          // sendMail({
          //   to: req.body.email,
          //   subject: 'Email Confirmation',
          //   html: '<h1>Welcome</h1><p>That was easy!</p>' + token
          // })
          res.status(201).json({ status: true, message: 'reset link sent', token: result.ops[0].token })
        }else {
          res.status(400).json({ status: false, message: 'try again!' })
        }
      })
    }else{
      res.status(400).json({ status: false, message: 'this email does not exist.' })
    }
  })
})

/**
 * @swagger
 * path:
 *  /doctor/reset-password:
 *    post:
 *      summary: Use to doctor reset-password
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPassword'
 *      responses:
 *        "200":
 *          description: doctor response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordResponse'
 */
doctorRouter.post('/reset-password', async (req, res)=>{
  const { token, password } = req.body
  await checkResetToken({ token: token }, async (doctor)=>{
    if(doctor && doctor.doctor_id){
      bcrypt.hash(password, saltRounds, async function (err,   hash) {
        const payload = {
          password: hash
        }
        await updateDoctor(doctor.doctor_id, payload, null, async (result)=>{
        if(result && result.modifiedCount){
          await deleteResetToken({ token: token }, (status)=>{
          })
          res.status(201).json({ status: true, message: 'password changed' })
        }else {
          res.status(400).json({ status: false, message: 'try again!' })
        }
      })
      })
    }else{
      res.status(400).json({
        status: false,
        error: 'token expired'
      })
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/vacation:
 *    post:
 *      summary: Use to doctor vacation
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vacation'
 *      responses:
 *        "201":
 *          description: vacation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/VacationResponse'
 */
loggedDoctorRouter.post('/vacation', HasRole(doctorVacation, 'add'), async (req, res)=>{
  await createDoctorVacation({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "vacation added"})
    }else{
      res.status(400).json(result)
    }
  }).catch(err=>{
    res.status(400).json({ status: false, message: "something went wrong!"})
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/vacation/search/{skip}:
 *    post:
 *      summary: Use to list or search doctor vacation
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vacation'
 *      responses:
 *        "200":
 *          description: vacation search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Vacation'
 */
loggedDoctorRouter.post('/vacation/search/:skip', async (req, res)=>{
  await findDoctorVacation({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/vacation/update/{id}:
 *    put:
 *      summary: Use to update doctor vacation by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: vacation id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vacation'
 *      responses:
 *        "201":
 *          description: doctor vacation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/VacationUpdateResponse'
 */
loggedDoctorRouter.put('/vacation/update/:id', HasRole(doctorVacation, 'update'), async (req, res)=>{
  await updateDoctorVacation(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'vacation updated' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/vacation/delete/{id}:
 *    put:
 *      summary: Use to delete doctor vacation by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: vacation id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: doctor vacation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/VacationDeleteResponse'
 */
loggedDoctorRouter.put('/vacation/delete/:id', HasRole(doctorVacation, 'update'), async (req, res)=>{
  await updateDoctorVacation(req.params.id, { delete: true }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'vacation deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

loggedDoctorRouter.put('/upload-image/:id', HasRole(doctor, 'update'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/doctor/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        await updateDoctor(req.params.id, { image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.modifiedCount){
            res.status(201).json({ status: true, message: "image uploaded"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

/**
 * @swagger
 * path:
 *  /logged/doctor/category/{id}:
 *    put:
 *      summary: Use to add doctor category by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        "201":
 *          description: doctor category response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryResponse'
 */
loggedDoctorRouter.put('/category/:id', HasRole(doctor, 'update'), async (req, res)=>{
  await addCategory(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "category added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/category-remove/{id}:
 *    put:
 *      summary: Use to remove doctor category by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        "201":
 *          description: doctor category response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryDeleteResponse'
 */
loggedDoctorRouter.put('/category-remove/:id', HasRole(doctor, 'update'), async (req, res)=>{
  await removeCategory(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'category deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/appointment:
 *    post:
 *      summary: Use to doctor appointment
 *      tags: [Doctors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 *      responses:
 *        "201":
 *          description: appointment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentResponse'
 */
loggedDoctorRouter.post('/appointment', HasRole(doctorAppointment, 'update'), async (req, res)=>{
  await createAppointment({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "appointment added"})
    }else{
      res.status(400).json(result)
    }
  }).catch(err=>{
    res.status(400).json({ status: false, message: "something went wrong!"})
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/appointment/search/{skip}:
 *    post:
 *      summary: Use to list or search doctor appointment
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 *      responses:
 *        "200":
 *          description: appointment search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Appointment'
 */
loggedDoctorRouter.post('/appointment/search/:skip', async (req, res)=>{
  await findAppointment({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/appointment/update/{id}:
 *    put:
 *      summary: Use to update doctor appointment by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: appointment id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Appointment'
 *      responses:
 *        "201":
 *          description: doctor appointment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentUpdateResponse'
 */
loggedDoctorRouter.put('/appointment/update/:id', HasRole(doctorAppointment, 'update'), async (req, res)=>{
  await updateAppointment(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'appointment updated' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/appointment/delete/{id}:
 *    put:
 *      summary: Use to delete doctor appointment by id
 *      tags: [Doctors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: appointment id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: doctor appointment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDeleteResponse'
 */
loggedDoctorRouter.put('/appointment/delete/:id', HasRole(doctorAppointment, 'update'), async (req, res)=>{
  await updateAppointment(req.params.id, { delete: true }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'appointment deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

module.exports = {
  doctorRouter: doctorRouter,
  loggedDoctorRouter: loggedDoctorRouter
}

const Router = require ('express')
const bcrypt = require('bcrypt')
const sendMail = require('../utils/email/nodeMailer')
const randomString = require('../utils/randomString')
const { checkUser } = require('../utils/tokenMiddleware')
const ObjectId = require("mongodb").ObjectId
const {
  createUser,
  findUser,
  updateUser,
  addResetToken,
  checkResetToken,
  deleteResetToken
} = require('../models/userModel')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { validateAuth } = require('../utils/verifyAuthToken')
const { createToken, verifyToken } = require('../utils/token')
const { HasRole } = require('../utils/permissionMiddleware')
const { user_new } = require('../utils/collections')

const saltRounds = 10
const userRouter = Router()
const userRouterLogged = Router()

 /**
  * @swagger
  * path:
  *  /user/token:
  *    post:
  *      summary: Use to refresh user token
  *      tags: [Users]
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              $ref: '#/components/schemas/RefreshToken'
  *      responses:
  *        "201":
  *          description: A user login response
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/RefreshTokenResponse'
  */
userRouter.post('/token', (req, res)=> verifyToken(req, res, 'user') )

/**
 * @swagger
 * path:
 *  /user/oauth/{token}/{provider}:
 *    post:
 *      summary: Use to user signup via oauth
 *      tags: [Users]
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
 *              $ref: '#/components/schemas/UserSignup'
 *      responses:
 *        "201":
 *          description: user signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSignupResponse'
 */
userRouter.post('/oauth/:token/:provider', async (req, res)=>{
  const data = await validateAuth(req.params.token, req.params.provider)
  if(data){
    await findUser({
      user_email: req.body.user_email
    }, 0, async (user)=>{
      if(user && user.length>0){
        delete user[0].user_password
        let data = createToken('user', user[0])
        res.status(200).json({
          ...data,
          status: true,
          message: "login succuss",
          user: user[0]
        })
      }else{
        await createUser({
          ...req.body,
          user_password: 'no password',
          verified: 1,
        }, (result)=>{
          if(result && result.insertedCount){
            let user = result.ops[0]
            delete user.user_password
            let data = createToken('user', user)
            res.status(200).json({
              ...data,
              status: true,
              message: "login succuss",
              user: user
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
 *  /user/signup:
 *    post:
 *      summary: Use to user signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSignup'
 *      responses:
 *        "201":
 *          description: user signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSignupResponse'
 */
userRouter.post('/signup', (req, res)=>{
  bcrypt.hash(req.body.user_password, saltRounds, async function (err,   hash) {
    await createUser({
      ...req.body,
      verified: 0,
      user_password: hash
    }, (result)=>{
      if(result && result.insertedCount){
        // sendMail({
        //   to: req.body.user_email,
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
 *  /user/login:
 *    post:
 *      summary: Use to user login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        "200":
 *          description: user login response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserLoginResponse'
 */
userRouter.post('/login', async (req, res)=>{
  const { email, password } = req.body
  await findUser({
    user_email: email
  }, 0, (user)=>{
    if(user && user.length>0){
      bcrypt.compare(password, user[0].user_password, function (err, result) {
        if(result == true){
          delete user[0].user_password
          let data = createToken('user', user[0])
          res.status(200).json({
            ...data,
            status: true,
            message: "login succuss",
            user: user[0]
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
 *  /user/forget-password:
 *    post:
 *      summary: Use to user forget-password
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgetPassword'
 *      responses:
 *        "200":
 *          description: user response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForgetPasswordResponse'
 */
userRouter.post('/forget-password', async (req, res)=>{
  await findUser({ user_email: req.body.email }, 0, async (user)=>{
    if(user && user._id){
      const token = randomString()
      const payload = {
        user_id: new ObjectId(user._id),
        token: token
      }
      await addResetToken(payload, (result)=>{
        if(result && result.insertedCount){
          // sendMail({
          //   to: req.body.user_email,
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
 *  /user/reset-password:
 *    post:
 *      summary: Use to user reset-password
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPassword'
 *      responses:
 *        "200":
 *          description: user response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordResponse'
 */
userRouter.post('/reset-password', async (req, res)=>{
  const { token, password } = req.body
  await checkResetToken({ token: token }, async (user)=>{
    if(user && user.user_id){
      bcrypt.hash(password, saltRounds, async function (err,   hash) {
      const payload = {
        user_password: hash
      }
      await updateUser(user.user_id, payload, null, async (result)=>{
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
 *  /user/search/{skip}:
 *    post:
 *      summary: Use to list or search user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSearch'
 *      responses:
 *        "200":
 *          description: user search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSignup'
 */
userRouter.post('/search/:skip', async (req, res)=>{
  await findUser({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/user/update/{id}:
 *    put:
 *      summary: Use update user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: user id
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
 *              $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *        "201":
 *          description: user update response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserUpdateResponse'
 */
userRouterLogged.put('/update/:id', HasRole(user_new, 'update'), async (req, res)=>{
  await updateUser(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "user updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/user/confirmation/{id}:
 *    put:
 *      summary: Use confirmation user email
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: user id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: user response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserConfirmResponse'
 */
userRouterLogged.put('/confirmation/:id', async (req, res)=>{
  await updateUser(req.params.id, { verified: 1 }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "user verified"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/user/delete/{id}:
 *    put:
 *      summary: Use delete/ disable user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: user id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: user response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserDeleteResponse'
 */
userRouterLogged.put('/delete/:id', HasRole(user_new, 'update'), async (req, res)=>{
  await updateUser(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "user deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/user/upload-image/{id}:
 *    put:
 *      summary: Use to upload user image
 *      tags: [Users]
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: user id
 *        - in: formData
 *          name: image
 *          schema:
 *            type: file
 *          required: true
 *          description: user image
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: user response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserUpdateResponse'
 */
userRouterLogged.put('/upload-image/:id', HasRole(user_new, 'update'), async (req, res)=>{
  console.log(req);
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/user/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        await updateUser(req.params.id, { user_image: imageUrl }, checkUser(req), (result)=>{
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
    })
  }
})

module.exports = {
  userRouter: userRouter,
  userRouterLogged: userRouterLogged
}

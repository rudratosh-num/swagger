const Router = require ('express')
const bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let { clientSecret } = require('../utils/config')
const sendMail = require('../utils/email/nodeMailer')
const randomString = require('../utils/randomString')
const ObjectId = require("mongodb").ObjectId
const { checkUser } = require('../utils/tokenMiddleware')
const {
  createClient, addContactUs, addClientDevice,
  findClient, findContactUs, findClientDevice,
  updateClient, updateContactUs, updateClientDevice,
  clientFavourite, clientFavouriteRemove,
  getClientById, addResetToken,
  checkResetToken, deleteResetToken
} = require('../models/clientModel')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { validateAuth } = require('../utils/verifyAuthToken')
const { createToken, verifyToken } = require('../utils/token')
const { HasRole } = require('../utils/permissionMiddleware')
const { client, contactUs, client_devices } = require('../utils/collections')

const saltRounds = 10
const clientRouter = Router()
const clientRouterLogged = Router()

/**
 * @swagger
 * path:
 *  /client/token:
 *    post:
 *      summary: Use to refresh client token
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *        "201":
 *          description: A client login response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RefreshTokenResponse'
 */
clientRouter.post('/token', (req, res)=> verifyToken(req, res, 'client') )

/**
 * @swagger
 * path:
 *  /client/oauth/{token}/{provider}:
 *    post:
 *      summary: Use to client signup via oauth
 *      tags: [Clients]
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
 *              $ref: '#/components/schemas/ClientSignup'
 *      responses:
 *        "201":
 *          description: client signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientSignupResponse'
 */
clientRouter.post('/oauth/:token/:provider', async (req, res)=>{
  const data = await validateAuth(req.params.token, req.params.provider)
  if(data){
    await findClient({
      client_email: req.body.client_email
    }, 0, async (clients)=>{
      if(clients && clients.length>0){
        delete clients[0].client_password
        let data = createToken('client', clients[0])
        res.status(200).json({
          ...data,
          status: true,
          message: "login succuss",
          client: clients[0]
        })
      }else{
        await createClient({
          ...req.body,
          client_password: 'no password',
          client_verify: 0,
        }, (result)=>{
          if(result && result.insertedCount){
            delete client.client_password
            let data = createToken('client', client)
            res.status(200).json({
              ...data,
              status: true,
              message: "login succuss",
              client: client
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
 *  /client/signup:
 *    post:
 *      summary: Use to client signup
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClientSignup'
 *      responses:
 *        "201":
 *          description: client signup response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientSignupResponse'
 */
clientRouter.post('/signup', async (req, res)=>{
  bcrypt.hash(req.body.client_password, saltRounds, async function (err,   hash) {
    await createClient({
      ...req.body,
      client_password: hash,
      client_verify: 0
    }, (result)=>{
      if(result && result.insertedCount){
        // sendMail({
        //   to: req.body.email,
        //   subject: 'Email Confirmation',
        //   html: '<h1>Welcome</h1><p>That was easy!</p>'
        // })
        res.status(201).json({ status: true, message: "client added"})
      }else{
        res.status(400).json(result)
      }
    })
  })
})

/**
 * @swagger
 * path:
 *  /client/login:
 *    post:
 *      summary: Use to client login
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        "200":
 *          description: client login response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientLoginResponse'
 */
clientRouter.post('/login', async (req, res)=>{
  const { email, password } = req.body
  await findClient({
    client_email: email
  }, 0, (clients)=>{
    if(clients && clients.length>0){
      console.log(clients);
      bcrypt.compare(password, clients[0].client_password, function (err, result) {
        if(result == true){
          delete clients[0].client_password
          let data = createToken('client', clients[0])
          res.status(200).json({
            ...data,
            status: true,
            message: "login succuss",
            client: clients[0]
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
 *  /client/forget-password:
 *    post:
 *      summary: Use to client forget-password
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgetPassword'
 *      responses:
 *        "200":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ForgetPasswordResponse'
 */
clientRouter.post('/forget-password', async (req, res)=>{
  await findClient({ client_email: req.body.email }, 0, async (client)=>{
    if(client && client.length>0){
      const token = randomString()
      const payload = {
        client_id: new ObjectId(client[0]._id),
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
 *  /client/reset-password:
 *    post:
 *      summary: Use to client reset-password
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPassword'
 *      responses:
 *        "200":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ResetPasswordResponse'
 */
clientRouter.post('/reset-password', async (req, res)=>{
  const { token, password } = req.body
  await checkResetToken({ token: token }, async (client)=>{
    if(client && client.client_id){
      bcrypt.hash(password, saltRounds, async function (err,   hash) {
        const payload = {
          client_password: hash
        }
        await updateClient(client.client_id, payload, checkUser(req), async (result)=>{
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
 *  /client/search/{skip}:
 *    post:
 *      summary: Use to list or search client
 *      tags: [Clients]
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
 *              $ref: '#/components/schemas/ClientSignup'
 *      responses:
 *        "200":
 *          description: client search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientSignup'
 */
clientRouter.post('/search/:skip', async (req, res)=>{
  await findClient({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/update/{id}:
 *    put:
 *      summary: Use to update client by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
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
 *              $ref: '#/components/schemas/ClientSignup'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientUpdateResponse'
 */
clientRouterLogged.put('/update/:id', HasRole(client, 'update'), async (req, res)=>{
  await updateClient(req.params.id, { ...req.body }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "client updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/add-favourite/{id}:
 *    put:
 *      summary: Use to add favourite doctor for client
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
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
 *              $ref: '#/components/schemas/Favourite'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FavouriteAddResponse'
 */
clientRouterLogged.put('/add-favourite/:id', HasRole(client, 'update'), async (req, res)=>{
  await clientFavourite(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(200).json({ status: true, message: "favourite doctor added"})
    }else{
      res.status(400).json(result)
    }
  })
})


/**
 * @swagger
 * path:
 *  /logged/client/remove-favourite/{id}:
 *    put:
 *      summary: Use to remove favourite doctor for client
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
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
 *              $ref: '#/components/schemas/Favourite'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/FavouriteRemoveResponse'
 */
clientRouterLogged.put('/remove-favourite/:id', HasRole(client, 'update'), async (req, res)=>{
  await clientFavouriteRemove(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "favourite doctor removed"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/get/{id}:
 *    put:
 *      summary: Use to get client by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientSignup'
 */
clientRouterLogged.get('/get/:id', (req, res)=> async (req, res)=>{
  await getClientById(req.params.id, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/delete/{id}:
 *    put:
 *      summary: Use to delete client by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ClientDeleteResponse'
 */
clientRouterLogged.put('/delete/:id', HasRole(client, 'update'), async (req, res)=>{
  await updateClient(req.params.id, { delete: true }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "client deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/contact-us/add/:
 *    post:
 *      summary: Use to add contact-us for client
 *      tags: [Clients]
 *      parameters:
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
 *              $ref: '#/components/schemas/ContactUs'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUsResponse'
 */
clientRouterLogged.post('/contact-us/add', HasRole(contactUs, 'add'), async (req, res)=>{
  await addContactUs({ ...req.body }, (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "contact us added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/contact-us/search/{skip}:
 *    post:
 *      summary: Use to list/ search contact-us
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: offset
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
 *              $ref: '#/components/schemas/ContactUs'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUs'
 */
clientRouterLogged.post('/contact-us/search/:skip', async (req, res)=>{
  await findContactUs({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/contact-us/update/{id}:
 *    put:
 *      summary: Use to update contact-us by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: contact-us id
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
 *              $ref: '#/components/schemas/ContactUs'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUsUpdateResponse'
 */
clientRouterLogged.put('/contact-us/update/:id', HasRole(contactUs, 'update'), async (req, res)=>{
  await updateContactUs(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact us updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/contact-us/delete/{id}:
 *    put:
 *      summary: Use to delete contact-us by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: contact-us id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUsDeleteResponse'
 */
clientRouterLogged.put('/contact-us/delete/:id', HasRole(contactUs, 'update'), async (req, res)=>{
  await updateContactUs(req.params.id, { delete: true }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact us deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/confirmation/{id}:
 *    put:
 *      summary: Use confirmation client email
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: client id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserConfirmResponse'
 */
clientRouterLogged.put('/confirmation/:id', HasRole(client, 'update'), async (req, res)=>{
  await updateClient(req.params.id, { client_verify: 1 }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "client verified"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/device/add/:
 *    post:
 *      summary: Use to add device for client
 *      tags: [Clients]
 *      parameters:
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
 *              $ref: '#/components/schemas/ContactUs'
 *      responses:
 *        "201":
 *          description: client response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUsResponse'
 */
clientRouterLogged.post('/device/add', HasRole(client_devices, 'add'), async (req, res)=>{
  await addClientDevice({ ...req.body }, (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "device added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/device/search/{skip}:
 *    post:
 *      summary: Use to list/ search device
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: offset
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
 *              $ref: '#/components/schemas/Device'
 *      responses:
 *        "201":
 *          description: device response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Device'
 */
clientRouterLogged.post('/device/search/:skip', async (req, res)=>{
  await findClientDevice({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/device/update/{id}:
 *    put:
 *      summary: Use to update device by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: device id
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
 *              $ref: '#/components/schemas/Device'
 *      responses:
 *        "201":
 *          description: device response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DeviceUpdateResponse'
 */
clientRouterLogged.put('/device/update/:id', HasRole(client_devices, 'update'), async (req, res)=>{
  await updateClientDevice(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "device updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/client/device/delete/{id}:
 *    put:
 *      summary: Use to delete device by id
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: device id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: device response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DeviceDeleteResponse'
 */
clientRouterLogged.put('/device/delete/:id', HasRole(client_devices, 'update'), async (req, res)=>{
  await updateClientDevice(req.params.id, { delete: true }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "client deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

module.exports = {
  clientRouter: clientRouter,
  clientRouterLogged: clientRouterLogged
}

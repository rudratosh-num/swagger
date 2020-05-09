const Router = require ('express')
const ObjectId = require("mongodb").ObjectId
const {
  createOffer, findOffer, updateOffer, getOfferById,
  addOfferImage, addOfferReservation, addOfferAppointment, addOfferReserComment,
  findOfferImage, findOfferReservation, findOfferAppointment, findOfferReserComment,
  updateOfferImage, updateOfferReservation, updateOfferAppointment, updateOfferReserComment
} = require('../models/offerModel')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { HasRole } = require('../utils/permissionMiddleware')
const {
  offer, offerImages, offerAppointment,
  offersReservations, offerComment
} = require('../utils/collections')
const { checkUser } = require('../utils/tokenMiddleware')

const offerRouterLogged = Router()

/**
 * @swagger
 * path:
 *  /logged/offer/add:
 *    post:
 *      summary: Use to add offer
 *      tags: [Offer]
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
 *              $ref: '#/components/schemas/Offer'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OfferResponse'
 */
offerRouterLogged.post('/add', HasRole(offer, 'add'), async (req, res)=>{
  await createOffer({ ...req.body, display: 0 }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "offer added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/search/{skip}:
 *    post:
 *      summary: Use to list or search offer
 *      tags: [Offer]
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
 *              $ref: '#/components/schemas/Offer'
 *      responses:
 *        "200":
 *          description: permission search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Offer'
 */
offerRouterLogged.post('/search/:skip', async (req, res)=>{
  await findOffer({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/get/{id}:
 *    get:
 *      summary: Use to offer by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "200":
 *          description: permission response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Offer'
 */
offerRouterLogged.put('/get/:id', async (req, res)=>{
  await getOfferById({ _id: new ObjectId(req.params.id) }, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/update/{id}:
 *    put:
 *      summary: Use to update offer
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
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
 *              $ref: '#/components/schemas/Offer'
 *      responses:
 *        "201":
 *          description: offer response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OfferUpdateResponse'
 */
offerRouterLogged.put('/update/:id', HasRole(offer, 'update'), async (req, res)=>{
  await updateOffer(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "offer updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable offer by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: offer response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/OfferDeleteResponse'
 */
offerRouterLogged.put('/delete/:id', HasRole(offer, 'update'), async (req, res)=>{
  await updateOffer(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "offer deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

offerRouterLogged.put('/image/:id', HasRole(offerImages, 'add'), async (req, res)=>{
  if(req.files && req.files.image && req.files.image.length>0){
    const imageUrl = `/images/offer`
    let _ids = []
    let failed = [];
    const payload = [];
    req.files.image.map((e, i)=>{
      let _id = new ObjectId()
      let image = `${ imageUrl }/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ e.name }`
      e.mv(`${ baseUrl }/${ image }`, async function(err) {
        if (err){
          console.log(err);
          res.status(400).json({
            status: false,
            message: 'error in upload',
            filename: e.name
          })
        }else {
          await addOfferImage(req.params.id, { image: image }, checkUser(req), (result)=>{
            if(result && result.insertedCount){}
            else{
              res.status(400).json({
                status: false,
                message: 'error in upload',
                filename: e.name
              })
            }
          })
        }
      })
    })
    res.status(201).json({ status: true, message: "image added"})
  }else{
      res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

offerRouterLogged.post('/image/search', async (req, res)=>{
  await findOfferImage({ ...req.body }, (result)=>{
    res.status(200).json(result)
  })
})

// offerRouterLogged.put('/image/update/:id', HasRole(offerImages, 'update'), async (req, res)=>{
//   await updateOfferImage(req.params.id, { ...req.body }, checkUser(req), (result)=>{
//     if(result && result.modifiedCount){
//       res.status(201).json({ status: true, message: "offer updated"})
//     }else{
//       res.status(400).json(result)
//     }
//   })
// })

offerRouterLogged.put('/image/delete/:id', HasRole(offerImages, 'update'), async (req, res)=>{
  await updateOfferImage(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "offer deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/id:
 *    post:
 *      summary: Use to add offer reservation
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: reservation id
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
 *              $ref: '#/components/schemas/Reservation'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationResponse'
 */
offerRouterLogged.put('/reservation/:id', HasRole(offersReservations, 'add'), async (req, res)=>{
  await addOfferReservation(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "reservation added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/search/{skip}:
 *    post:
 *      summary: Use to list or search offer reservation
 *      tags: [Offer]
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
 *              $ref: '#/components/schemas/Reservation'
 *      responses:
 *        "200":
 *          description: permission search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Reservation'
 */
offerRouterLogged.post('/reservation/search/:skip', async (req, res)=>{
  await findOfferReservation({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/update/{id}:
 *    put:
 *      summary: Use to update offer reservation by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
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
 *              $ref: '#/components/schemas/Reservation'
 *      responses:
 *        "201":
 *          description: reservation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationUpdateResponse'
 */
offerRouterLogged.put('/reservation/update/:id', HasRole(offersReservations, 'update'), async (req, res)=>{
  await updateOfferReservation(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "reservation updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable offer reservation by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: reservation id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: offer reservation response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationDeleteResponse'
 */
offerRouterLogged.put('/reservation/delete/:id', HasRole(offersReservations, 'update'), async (req, res)=>{
  await updateOfferReservation(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "reservation deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/comment/add/{id}:
 *    post:
 *      summary: Use to add offer reservation comment
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: reservation id
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
 *              $ref: '#/components/schemas/ReservationComment'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationCommentResponse'
 */
offerRouterLogged.post('/reservation/comment/add/:id', HasRole(offerComment, 'add'),async (req, res)=>{
  await addOfferReserComment(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "comment added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/comment/search/{skip}:
 *    post:
 *      summary: Use to list or search reservation comment
 *      tags: [Offer]
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
 *              $ref: '#/components/schemas/ReservationComment'
 *      responses:
 *        "200":
 *          description: permission search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationComment'
 */
offerRouterLogged.post('/reservation/comment/search/:skip', async (req, res)=>{
  await findOfferReserComment({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/comment/update/{id}:
 *    put:
 *      summary: Use to update reservation comment by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: reservation id
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
 *              $ref: '#/components/schemas/ReservationComment'
 *      responses:
 *        "201":
 *          description: reservation comment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationCommentUpdateResponse'
 */
offerRouterLogged.put('/reservation/comment/update/:id', HasRole(offerComment, 'update'),async (req, res)=>{
  await updateOfferReserComment(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "comment updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/reservation/comment/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable reservation comment by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: reservation comment id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: reservation comment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ReservationCommentDeleteResponse'
 */
offerRouterLogged.put('/reservation/comment/delete/:id', HasRole(offerComment, 'update'), async (req, res)=>{
  await updateOfferReserComment(req.params.id, { delete: true }, (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "comment deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/appointment/{id}:
 *    post:
 *      summary: Use to add offer appointment
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
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
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentResponse'
 */
offerRouterLogged.put('/appointment/:id', HasRole(offerAppointment, 'add'), async (req, res)=>{
  await addOfferAppointment(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "appointment added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/appointment/search/{skip}:
 *    post:
 *      summary: Use to list or search offer appointment
 *      tags: [Offer]
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
 *              $ref: '#/components/schemas/Appointment'
 *      responses:
 *        "200":
 *          description: permission search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Appointment'
 */
offerRouterLogged.post('/appointment/search/:skip', async (req, res)=>{
  await findOfferAppointment({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/appointment/update/{id}:
 *    put:
 *      summary: Use to update offer appointment by id
 *      tags: [Offer]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: offer id
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
 *              $ref: '#/components/schemas/Appointment'
 *      responses:
 *        "201":
 *          description: offer appointment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentUpdateResponse'
 */
offerRouterLogged.put('/appointment/update/:id', HasRole(offerAppointment, 'update'), async (req, res)=>{
  await updateOfferAppointment(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "appointment updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/offer/appointment/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable appointment by id
 *      tags: [Offer]
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
 *          description: appointment response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AppointmentDeleteResponse'
 */
offerRouterLogged.put('/appointment/delete/:id', HasRole(offerAppointment, 'update'), async (req, res)=>{
  await updateOfferAppointment(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "appointment deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

module.exports = {
  offerRouterLogged: offerRouterLogged
}

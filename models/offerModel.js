const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const {
  offer, offerImages, offerAppointment,
  offersReservations, offerComment
} = require('../utils/collections')
const {
  offerSchema, offerImagesSchema, offerCommentsSchema,
  offersReservationsSchema, offerAppointmentSchema
} = require('../schemas/validator')
const { transactionLocal } = require('../utils/transactionOptions')

const getOfferById = async (payload, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offer).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'doctor',
            localField: 'doctor_id',
            foreignField: '_id',
            as: 'doctor_id'
          } },
          { $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category_id'
          } },
          { $lookup: {
            from: 'hospital',
            localField: 'hospital_id',
            foreignField: '_id',
            as: 'hospital_id'
          } },
          { $project: { delete: 0 } }
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const createOffer = async (payload, user_id, callback)=>{
  const { err, value } = offerSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
      try {
        DBPool( async (db, dbClient)=>{
          const { doctor_id, category_id, hospital_id } = value
          const res = await db.collection(offer).insertOne({
            ...value,
            doctor_id: new ObjectId(doctor_id),
            category_id: new ObjectId(category_id),
            hospital_id: new ObjectId(hospital_id),
            user_created: user_id,
            date_added: moment().toISOString()
          }).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          dbClient.close()
          callback(res)
        })
      } catch (err) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const findOffer = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offer).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const updateOffer = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(offer).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          user_modified: user_id,
          date_modified: moment().toISOString()
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      dbClient.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

const addOfferImage = async (id, payload, user_id, callback)=>{
  const { err, value } = offerImagesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, dbClient)=>{
        const session = dbClient.startSession();
        session.withTransaction(async () => {
          const _id = new ObjectId()
          const res = await db.collection(offerImages).insertOne({
            ...value,
            _id: _id,
            user_created: user_id,
            date_added: moment().toISOString()
          })
          .catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await db.collection(offer).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              images: _id
            } }
          ).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await callback(res)
          await session.endSession();
          await dbClient.close()
        }, transactionLocal);
      })
    } catch (err) {
  callback({
    status: false,
    error: 'db error'
  })
}
  }
}

const findOfferImage = async (payload, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offerImages).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } }
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const updateOfferImage = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(offerImages).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          user_modified: user_id,
          date_modified: moment().toISOString()
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      dbClient.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

const addOfferReservation = async (id, payload, user_id, callback)=>{
  const { err, value } = offersReservationsSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, dbClient)=>{
        const session = dbClient.startSession();
        session.withTransaction(async () => {
          const _id = new ObjectId()
          const res = await db.collection(offersReservations).insertOne({
            ...value,
            _id: _id,
            user_created: user_id,
            date_added: moment().toISOString()
          })
          .catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          console.log(res);
          await db.collection(offer).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              reservations: _id
            } }
          ).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await callback(res)
          await session.endSession();
          await dbClient.close()
        }, transactionLocal);
      })
    } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const findOfferReservation = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offersReservations).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const updateOfferReservation = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(offersReservations).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          user_modified: user_id,
          date_modified: moment().toISOString()
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      dbClient.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

const addOfferAppointment = async (id, payload, user_id, callback)=>{
  const { err, value } = offerAppointmentSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, dbClient)=>{
        const session = dbClient.startSession();
        session.withTransaction(async () => {
          const _id = new ObjectId()
          const res = await db.collection(offerAppointment).insertOne({
            ...value,
            _id: _id,
            user_created: user_id,
            date_added: moment().toISOString()
          })
          .catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          console.log(res);
          await db.collection(offer).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              appointment: _id
            } }
          ).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await callback(res)
          await session.endSession();
          await dbClient.close()
        }, transactionLocal);
      })
    } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const findOfferAppointment = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offerAppointment).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const updateOfferAppointment = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(offerAppointment).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          user_modified: user_id,
          date_modified: moment().toISOString()
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      dbClient.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

const addOfferReserComment = async (id, payload, user_id, callback)=>{
  const { err, value } = offerCommentsSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, dbClient)=>{
        const session = dbClient.startSession();
        session.withTransaction(async () => {
          const _id = new ObjectId()
          const res = await db.collection(offerComment).insertOne({
            ...value,
            _id: _id,
            user_created: user_id,
            date_added: moment().toISOString()
          })
          .catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await db.collection(offersReservations).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              comments: _id
            } }
          ).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await callback(res)
          await session.endSession();
          await dbClient.close()
        }, transactionLocal);
      })
    } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const findOfferReserComment = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(offerComment).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ])
        .toArray()
        .catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        dbClient.close()
        callback(res)
      })
  } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
}

const updateOfferReserComment = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(offerComment).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          user_modified: user_id,
          date_modified: moment().toISOString()
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      dbClient.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

module.exports = {
  getOfferById: getOfferById,
  createOffer: createOffer,
  findOffer: findOffer,
  updateOffer: updateOffer,
  addOfferImage: addOfferImage,
  findOfferImage: findOfferImage,
  updateOfferImage: updateOfferImage,
  addOfferReservation: addOfferReservation,
  findOfferReservation: findOfferReservation,
  updateOfferReservation: updateOfferReservation,
  addOfferAppointment: addOfferAppointment,
  findOfferAppointment: findOfferAppointment,
  updateOfferAppointment: updateOfferAppointment,
  addOfferReserComment: addOfferReserComment,
  findOfferReserComment: findOfferReserComment,
  updateOfferReserComment: updateOfferReserComment
}

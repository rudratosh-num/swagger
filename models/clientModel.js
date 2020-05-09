const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const {
  client, contactUs, client_devices,
  reset_password_client
} = require('../utils/collections')
const {
  clientSchema, clientFavSchema,
  contactUsSchema, devicesSchema
} = require('../schemas/validator')
const { transactionLocal } = require('../utils/transactionOptions')

const createClient = async (payload, callback)=>{
  const { err, value } = clientSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(client).insertOne({
          ...value,
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

const addContactUs = async (payload, callback)=>{
  const { err, value } = contactUsSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(contactUs).insertOne({
          ...value,
          client_id: new ObjectId(value.client_id),
          date_added: moment().toISOString()
        }).catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        client.close()
        callback(res)
      })
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const addClientDevice = async (payload, user_id, callback)=>{
  const { err, value } = devicesSchema.validate(payload)
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
          const res = await db.collection(client_devices).insertOne({
            ...value,
            _id: _id,
            user_created: user_id,
            date_added: moment().toISOString()
          }).catch(err=>{
            callback({
              status: false,
              error: 'db error'
            })
          })
          await db.collection(offer).updateOne(
            { _id: new ObjectId(id) },
            { $set: {
              user_modified: user_id,
              date_modified: moment().toISOString()
            } },
            { $addToSet: {
              device: _id
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

const findClient = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(client).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'doctor',
            localField: 'favourite.doctor_id',
            foreignField: '_id',
            as: 'favourite'
          } },
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

const findContactUs = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(contactUs).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'client',
            localField: 'client_id',
            foreignField: '_id',
            as: 'client_id'
          } },
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
        client.close()
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

const findClientDevice = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(client).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'client_devices',
            localField: 'device',
            foreignField: '_id',
            as: 'device'
          } },
          { $project: { delete: 0, 'client_devices.delete': 0 } },
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

const updateClient = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(client).updateOne(
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

const updateContactUs = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(contactUs).updateOne(
        { _id: new ObjectId(id) },
        { $set: {
          ...payload,
          date_modified: moment().toISOString(),
          user_modified: user_id
        } }
      ).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      callback(res)
      client.close()
    })
  } catch (err) {
    callback({
      status: false,
      error: 'db error'
    })
    console.log(err)
  }
}

const updateClientDevice = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, dbClient)=>{
      const res = await db.collection(client_devices).updateOne(
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

const clientFavourite = async (id, payload, user_id, callback)=>{
  const { err, value } = clientFavSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
      try {
        DBPool( async (db, dbClient)=>{
          const res = await db.collection(client).updateOne(
            { _id: new ObjectId(id) },
            { $set: {
              user_modified: user_id,
              date_modified: moment().toISOString()
            } },
            { $addToSet: {
              favourite: {
                doctor_id: new ObjectId(value.doctor_id),
                user_created: user_id,
                date_added: moment().toISOString()
              }
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
}

const clientFavouriteRemove = async (id, payload, user_id, callback)=>{
  const { err, value } = clientFavSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
      try {
        DBPool( async (db, dbClient)=>{
          const res = await db.collection(client).updateOne(
            { _id: new ObjectId(id) },
            { $set: {
              user_modified: user_id,
              date_modified: moment().toISOString()
            } },
            { $pull: {
              favourite: { doctor_id: new ObjectId(payload.doctor_id) }
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
}

const getClientById = async (id, callback)=>{
  try {
      DBPool( async (db, dbClient)=>{
        const res = await db.collection(client).aggregate([
          { $match: { _id: new ObjectId(id) } },
          { $lookup: {
            from: 'doctor',
            localField: 'favourite.doctor_id',
            foreignField: '_id',
            as: 'doctor_id'
          } },
          { $project: { delete: 0, client_password: 0 } }
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

const addResetToken = async (payload, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(reset_password_client).insertOne({
        ...payload,
        date_added: moment().toISOString()
      }).catch(err=>{
        callback({
          status: false,
          error: 'db error'
        })
      })
      client.close()
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

const checkResetToken = async (payload, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(reset_password_client).findOne({
          ...payload
        }).catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        client.close()
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

const deleteResetToken = async (payload, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(reset_password_client).deleteOne({
          ...payload
        }).catch(err=>{
          callback({
            status: false,
            error: 'db error'
          })
        })
        client.close()
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

module.exports = {
  createClient: createClient,
  addContactUs: addContactUs,
  addClientDevice: addClientDevice,
  findClient: findClient,
  findContactUs: findContactUs,
  findClientDevice: findClientDevice,
  updateClient: updateClient,
  updateContactUs: updateContactUs,
  updateClientDevice: updateClientDevice,
  clientFavourite: clientFavourite,
  clientFavouriteRemove: clientFavouriteRemove,
  getClientById: getClientById,
  addResetToken: addResetToken,
  checkResetToken: checkResetToken,
  deleteResetToken: deleteResetToken
}

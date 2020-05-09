const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const {
  user_new,
  reset_password_user
} = require('../utils/collections')
const { userSchema } = require('../schemas/validator')

const createUser = async (payload, callback)=>{
  const { err, value } = userSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(user_new).insertOne({
          ...value,
          verified: 0,
          status: 1,
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
}

const findUser = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(user_new).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ]).toArray()
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

const updateUser = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(user_new).updateOne(
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

const addResetToken = async (payload, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(reset_password_user).insertOne({
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
        const res = await db.collection(reset_password_user).findOne({
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
        const res = await db.collection(reset_password_user).deleteOne({
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
  createUser: createUser,
  findUser: findUser,
  updateUser: updateUser,
  addResetToken: addResetToken,
  checkResetToken: checkResetToken,
  deleteResetToken: deleteResetToken
}

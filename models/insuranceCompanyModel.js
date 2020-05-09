const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const { insuranceCompaney } = require('../utils/collections')
const { insuranceCompaniesSchema } = require('../schemas/validator')

const addInsurance = async (payload, user_id, callback)=>{
  const { err, value } = insuranceCompaniesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(insuranceCompaney).insertOne({
          ...value,
          country_id: value.country_id? new ObjectId(value.country_id): null,
          user_created: user_id,
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

const findInsurance = async (payload, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(insuranceCompaney).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'countries',
            localField: 'country_id',
            foreignField: '_id',
            as: 'country_id'
          } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ]).toArray().catch(err=>{
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

const updateInsurance = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(insuranceCompaney).updateOne(
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

module.exports = {
  addInsurance: addInsurance,
  findInsurance: findInsurance,
  updateInsurance: updateInsurance
}

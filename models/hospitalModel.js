const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const { hospital } = require('../utils/collections')
const {
  hospitalSchema,
  hospitalInsuranceCompaniesSchema,
  doctorHospitalSchema,
  hospitalCategoriesSchema
} = require('../schemas/validator')

const addHospital = async (payload, user_id, callback)=>{
  const { err, value } = hospitalSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(hospital).insertOne({
          ...value,
          country_id: value.country_id? new ObjectId(value.country_id): null,
          city_id: value.city_id? new ObjectId(value.city_id): null,
          region_id: value.region_id? new ObjectId(value.region_id): null,
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

const findHospital = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(hospital).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'countries',
            localField: 'country_id',
            foreignField: '_id',
            as: 'country_id'
          } },
          { $lookup: {
            from: 'cities',
            localField: 'city_id',
            foreignField: '_id',
            as: 'city_id'
          } },
          { $lookup: {
            from: 'regions',
            localField: 'region_id',
            foreignField: '_id',
            as: 'region_id'
          } },
          { $project: {
            delete: 0,
            'country_id.delete': 0,
            'city_id.delete': 0,
            'region_id.delete': 0
          } },
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

const getHospitalById = async (id, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(hospital).aggregate([
          { $match: { _id: new ObjectId(id), delete: false } },
          { $lookup: {
            from: 'countries',
            localField: 'country_id',
            foreignField: '_id',
            as: 'country_id'
          } },
          { $lookup: {
            from: 'cities',
            localField: 'city_id',
            foreignField: '_id',
            as: 'city_id'
          } },
          { $lookup: {
            from: 'regions',
            localField: 'region_id',
            foreignField: '_id',
            as: 'region_id'
          } },
          { $lookup: {
            from: 'doctor',
            localField: 'doctors.doctor_id',
            foreignField: '_id',
            as: 'doctors'
          } },
          { $lookup: {
            from: 'insuranceCompaney',
            localField: 'insuranceCompany.company_id',
            foreignField: '_id',
            as: 'insuranceCompany'
          } },
          { $project: {
            delete: 0,
            'country_id.delete': 0,
            'city_id.delete': 0,
            'region_id.delete': 0,
            'insuranceCompany.delete': 0,
            'doctors.delete': 0,
            'doctors.password': 0
          } },
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

const updateHospital = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(hospital).updateOne(
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

const addInsurance = async (id, payload, user_id, callback)=>{
  const { err, value } = hospitalInsuranceCompaniesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  } else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(hospital).updateOne(
          { _id: new ObjectId(id) },
          { $addToSet: {
            insuranceCompany: {
              ...value,
              company_id: new ObjectId(value.company_id),
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
}

const removeInsurance = async (id, payload, user_id, callback)=>{
  const { company_id } = payload
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(hospital).updateOne(
        { _id: new ObjectId(id) },
        { $pull: {
          insuranceCompany: { company_id: new ObjectId(company_id) } }
        },
        { $set: {
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

const addDoctor = async (id, payload, user_id, callback)=>{
  const { err, value } = doctorHospitalSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  } else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(hospital).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              doctors: {
                ...value,
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
}

const removeDoctor = async (id, payload, user_id, callback)=>{
  const { doctor_id } = payload
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(hospital).updateOne(
        { _id: new ObjectId(id) },
        { $pull: {
          doctors: { doctor_id: new ObjectId(doctor_id) } }
        },
        { $set: {
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

const addCategory = async (id, payload, user_id, callback)=>{
  const { err, value } = hospitalCategoriesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  } else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(hospital).updateOne(
            { _id: new ObjectId(id) },
            { $addToSet: {
              categories: {
                ...value,
                category_id: new ObjectId(value.category_id),
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
}

const removeCategory = async (id, payload, user_id, callback)=>{
  const { category_id } = payload
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(hospital).updateOne(
        { _id: new ObjectId(id) },
        { $pull: {
          categories: { category_id: new ObjectId(category_id) } }
        },
        { $set: {
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
  addHospital: addHospital,
  findHospital: findHospital,
  updateHospital: updateHospital,
  addInsurance: addInsurance,
  removeInsurance: removeInsurance,
  addDoctor: addDoctor,
  removeDoctor: removeDoctor,
  getHospitalById: getHospitalById,
  addCategory: addCategory,
  removeCategory: removeCategory
}

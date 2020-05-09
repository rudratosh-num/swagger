const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const {
  doctor,
  doctorVacation,
  doctorAppointment,
  reset_password_doctor
} = require('../utils/collections')
const {
  doctorSchema,
  doctorVacationSchema,
  doctorAppointmentSchema,
  doctorCategoriesSchema
} = require('../schemas/validator')

const createDoctor = async (payload, user_id, callback)=>{
  const { err, value } = doctorSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(doctor).insertOne({
            ...value,
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
      } catch (err) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const createDoctorVacation = async (payload, user_id, callback)=>{
  const { err, value } = doctorVacationSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(doctorVacation).insertOne({
          ...value,
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
    } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const createAppointment = async (payload, user_id, callback)=>{
  const { err, value } = doctorAppointmentSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else{
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(doctorAppointment).insertOne({
          ...value,
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
    } catch (err) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const findDoctor = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(doctor).aggregate([
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

const findAppointment = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(doctorAppointment).aggregate([
          { $match: { ...payload, delete: false } },
          { $skip: Number(skip) },
          { $limit: 20},
          { $project: { delete: 0 } }
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

const findDoctorVacation = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(doctorVacation).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip) },
          { $limit: 20}
        ]).catch(err=>{
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

const updateDoctor = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(doctor).updateOne(
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

const updateAppointment = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(doctorAppointment).updateOne(
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

const updateDoctorVacation = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(doctorVacation).updateOne(
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

const addResetToken = async (payload, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(reset_password_doctor).insertOne({
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
        const res = await db.collection(reset_password_doctor).findOne({
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
        const res = await db.collection(reset_password_doctor).deleteOne({
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

const addCategory = async (id, payload, user_id, callback)=>{
  const { err, value } = doctorCategoriesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  } else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(doctor).updateOne(
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
      const res = await db.collection(doctor).updateOne(
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
  createDoctor: createDoctor,
  createDoctorVacation: createDoctorVacation,
  createAppointment: createAppointment,
  findDoctor: findDoctor,
  findAppointment: findAppointment,
  findDoctorVacation: findDoctorVacation,
  updateDoctor: updateDoctor,
  updateAppointment: updateAppointment,
  updateDoctorVacation: updateDoctorVacation,
  addResetToken: addResetToken,
  checkResetToken: checkResetToken,
  deleteResetToken: deleteResetToken,
  addCategory: addCategory,
  removeCategory: removeCategory
}

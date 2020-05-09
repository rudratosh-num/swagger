const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const {
  about, countries, cities,
  contact, weekDays, regions,
  categories, settings,
  templateMessages, webView,
  notification
} = require('../utils/collections')
const {
  aboutSchema, countriesSchema,
  citiesSchema, contactSchema,
  weekDaysSchema, regionSchema,
  categoriesSchema, settingSchema,
  templateMessagesSchema, webViewSchema,
  notificationSchema
} = require('../schemas/validator')

const addAbout = async (payload, user_id, callback)=>{
  const { err, value } = aboutSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(about).insertOne({
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
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const addCountry = async (payload, user_id, callback)=>{
  const { err, value } = countriesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(countries).insertOne({
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
      } catch (e) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const addCity = async (payload, user_id, callback)=>{
  const { err, value } = citiesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(cities).insertOne({
          ...value,
          user_created: user_id,
          country_id: new ObjectId(value.country_id),
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

const addContact = async (payload, user_id, callback)=>{
  const { err, value } = contactSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(contact).insertOne({
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
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const addWeekDay = async (payload, user_id, callback)=>{
  const { err, value } = weekDaysSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(weekDays).insertOne({
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
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const addRegion = async (payload, user_id, callback)=>{
  const { err, value } = regionSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(regions).insertOne({
          ...value,
          city_id: new ObjectId(value.city_id),
          country_id: new ObjectId(value.country_id),
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

const addCategory = async (payload, user_id, callback)=>{
  const { err, value } = categoriesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(categories).insertOne({
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
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const addSetting = async (payload, user_id, callback)=>{
  const { err, value } = settingSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(settings).insertOne({
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
      } catch (e) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const addTemplateMessages = async (payload, user_id, callback)=>{
  const { err, value } = templateMessagesSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(templateMessages).insertOne({
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
      } catch (e) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const addWebView = async (payload, user_id, callback)=>{
  const { err, value } = webViewSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
      try {
        DBPool( async (db, client)=>{
          const res = await db.collection(webView).insertOne({
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
      } catch (e) {
        callback({
          status: false,
          error: 'db error'
        })
        console.log(err)
      }
    }
}

const addNotification = async (payload, user_id, callback)=>{
  const { err, value } = notificationSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(notification).insertOne({
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
    } catch (e) {
      callback({
        status: false,
        error: 'db error'
      })
      console.log(err)
    }
  }
}

const findAbout = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(about).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findCountry = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(countries).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findCity = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(cities).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findContact = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(contact).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findWeekDays = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(weekDays).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findRegion = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(regions).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findCategories = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(categories).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findSettings = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(settings).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findTemplateMessages = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(templateMessages).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findWebView = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(webView).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const findNotification = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(notification).aggregate([
          { $match: { ...payload, delete: false } },
          { $project: { delete: 0 } },
          { $skip: Number(skip)},
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

const updateAbout = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(about).updateOne(
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

const updateTemplateMessages = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(templateMessages).updateOne(
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

const updateWebView = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(webView).updateOne(
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

const updateCountry = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(countries).updateOne(
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

const updateCity = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(cities).updateOne(
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

const updateContact = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(contact).updateOne(
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

const updateWeekDay = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(weekDays).updateOne(
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

const updateRegion = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(regions).updateOne(
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

const updateCategory = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(categories).updateOne(
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

const updateSetting = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(settings).updateOne(
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

const updateNotification = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(notification).updateOne(
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

module.exports = {
  addAbout: addAbout,
  addCountry: addCountry,
  addCity: addCity,
  addContact: addContact,
  addWeekDay: addWeekDay,
  addRegion: addRegion,
  addCategory: addCategory,
  addSetting: addSetting,
  addAbout: addAbout,
  addWebView: addWebView,
  addTemplateMessages: addTemplateMessages,
  addNotification: addNotification,
  findAbout: findAbout,
  findCountry: findCountry,
  findCity: findCity,
  findContact: findContact,
  findWeekDays: findWeekDays,
  findRegion: findRegion,
  findCategories: findCategories,
  findSettings: findSettings,
  findTemplateMessages: findTemplateMessages,
  findWebView: findWebView,
  findNotification: findNotification,
  updateAbout: updateAbout,
  updateCountry: updateCountry,
  updateCity: updateCity,
  updateContact: updateContact,
  updateWeekDay: updateWeekDay,
  updateRegion: updateRegion,
  updateCategory: updateCategory,
  updateSetting: updateSetting,
  updateTemplateMessages: updateTemplateMessages,
  updateWebView: updateWebView,
  updateNotification: updateNotification
}

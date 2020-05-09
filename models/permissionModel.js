const DBPool = require('../utils/dbPool')
const moment = require('moment')
const ObjectId = require("mongodb").ObjectId
const Joi = require('@hapi/joi');
const { permission, role, roleAccess } = require('../utils/collections')
const {
  permissionSchema,
  roleSchema,
  roleAccessSchema
} = require('../schemas/validator')

const addPermission = async (payload, user_id, callback)=>{
  const { err, value } = permissionSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(permission).insertOne({
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

const findPermission = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(permission).aggregate([
          { $match: { ...payload, delete: false } },
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

const updatePermission = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(permission).updateOne(
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

const addRole = async (payload, user_id, callback)=>{
  const { err, value } = roleSchema.validate(payload)
  if(err){
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(role).insertOne({
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

const findRole = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(role).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'permission',
            localField: 'permissions',
            foreignField: '_id',
            as: 'permissions'
          } },
          { $lookup: {
            from: 'user',
            localField: 'users',
            foreignField: '_id',
            as: 'users'
          } },
          { $project: {
            delete: 0
          } },
          { $skip: Number(skip)},
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

const findRoleInternal = async (payload, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(role).aggregate([
          { $match: { ...payload, delete: false } },
          { $lookup: {
            from: 'permission',
            localField: 'permissions',
            foreignField: '_id',
            as: 'permissions'
          } },
          { $lookup: {
            from: 'user',
            localField: 'users',
            foreignField: '_id',
            as: 'users'
          } },
          { $project: {
            _id: 1, title: 1, alias: 1,
            'permissions._id': 1, 'permissions.name': 1,
            'permissions.controller': 1, 'permissions.action': 1,
            'users._id': 1, 'users.user_name': 1
          } }
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

const updateRole = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(role).updateOne(
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

const removeRole = async (id, payload, user_id, callback)=>{
  const { permission_id } = payload
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(role).updateOne(
        { _id: new ObjectId(id) },
        { $pull: {
          permissions: new ObjectId(permission_id)
        } },
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

const removeUserToRole = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(role).updateOne(
        { _id: new ObjectId(id) },
        { $pull: {
          users: new ObjectId(payload.user_id)
        } },
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

const addRoleAccess = async (payload, user_id, callback)=>{
  const { err, value } = roleAccessSchema.validate(payload)
  if(err){
    console.log(err);
    callback({
      status: false,
      error: err.details
    })
  }else {
    try {
      DBPool( async (db, client)=>{
        const res = await db.collection(roleAccess).insertOne({
          ...value,
          role_id: new ObjectId(value.role_id),
          permission_id:  new ObjectId(value.permission_id),
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

const findRoleAccess = async (payload, skip, callback)=>{
  try {
      DBPool( async (db, client)=>{
        const res = await db.collection(roleAccess).aggregate([
          { $match: { ...payload, delete: false } },
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

const updateRoleAccess = async (id, payload, user_id, callback)=>{
  try {
    DBPool( async (db, client)=>{
      const res = await db.collection(roleAccess).updateOne(
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
  addPermission: addPermission,
  findPermission: findPermission,
  updatePermission: updatePermission,
  addRole: addRole,
  findRole: findRole,
  findRoleInternal: findRoleInternal,
  updateRole: updateRole,
  removeRole: removeRole,
  removeUserToRole: removeUserToRole,
  addRoleAccess: addRoleAccess,
  findRoleAccess: findRoleAccess,
  updateRoleAccess: updateRoleAccess
}

const { findRoleInternal } = require('../models/permissionModel')

const HasRole = (collection, permissions) => {
  return (req, res, next) => {
    let keys = Object.keys(req.decoded)
    if(keys && keys.length>0){
      findRoleInternal({ title: keys[0] }, (result)=>{
        if(result && result[0] && result[0].permissions && result[0].permissions.length>0){
          const res = result[0].permissions.filter((item) => {
            return permissions == item.action
          })
          if(res && res.length>0){
            return next()
          }else{
            res.status(403).json({
              status: false,
              message: 'forbidden'
            })
          }
        }else{
          res.status(403).json({
            status: false,
            message: 'forbidden'
          })
        }
      })
    }else {
      res.status(403).json({
        status: false,
        message: 'forbidden'
      })
    }
  }
}

module.exports = {
  HasRole,
}

let jwt = require('jsonwebtoken');
const ObjectId = require("mongodb").ObjectId
const { adminSecret, doctorSecret, clientSecret } = require('./config.js');

const checkUser = (req)=>{
  if(req.decoded && req.decoded.doctor){
    return new ObjectId(req.decoded.doctor._id)
  }else if(req.decoded && req.decoded.user){
    return new ObjectId(req.decoded.user._id)
  }else if(req.decoded && req.decoded.client){
    return new ObjectId(req.decoded.client._id)
  }else{
    return null
  }
}

let checkTokenAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['auth'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, adminSecret, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).json({
      status: false,
      message: 'Auth token is not supplied'
    });
  }
};

let checkTokenDoctor = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['auth'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, doctorSecret, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      message: 'Auth token is not supplied'
    });
  }
};

let checkTokenClient = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['auth'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, clientSecret, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkTokenAdmin: checkTokenAdmin,
  checkTokenDoctor: checkTokenDoctor,
  checkTokenClient: checkTokenClient,
  checkUser: checkUser
}

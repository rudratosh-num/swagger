let jwt = require('jsonwebtoken')
const cache = require('memory-cache')
const {
  adminSecret, doctorSecret, clientSecret,
  adminRefSecret, doctorRefSecret, clientRefSecret
} = require('./config')

const putRefToken = (refreshToken)=>{
  let tokens = cache.get('tokens')
  if(tokens){
    tokens = [...tokens, refreshToken]
    cache.put('tokens', tokens);
  //  console.log(cache.get('tokens'));
  }else{
    cache.put('tokens', [refreshToken]);
    //console.log(cache.get('tokens'));
  }
}

const checkRefToken = (refreshToken)=>{
  let tokens = cache.get('tokens')
  if(tokens){
    return tokens.includes(refreshToken)? true : false
  }else{
    return false
  }
}

const createToken = (type, obj) =>{
  if(type === 'user'){
    const refreshToken = jwt.sign({user: obj}, adminRefSecret)
    putRefToken(refreshToken)
    return {
      token: jwt.sign({user: obj}, adminSecret, { expiresIn: '24h' }),
      refreshToken
    }
  } else if(type === 'doctor'){
    const refreshToken = jwt.sign({doctor: obj}, doctorRefSecret)
    putRefToken(refreshToken)
    return {
      token: jwt.sign({doctor: obj}, doctorSecret, { expiresIn: '24h' }),
      refreshToken
    }
  } else if(type === 'client'){
    const refreshToken = jwt.sign({client: obj}, clientRefSecret)
    putRefToken(refreshToken)
    return {
      token: jwt.sign({client: obj}, clientSecret, { expiresIn: '24h' }),
      refreshToken
    }
  }else {
    return null
  }
}

const verifyToken = (req, res, type)=>{
  refreshToken = req.body.refreshToken
  if(checkRefToken(refreshToken)){
    if(type === 'user'){
      jwt.verify(refreshToken, adminRefSecret, (err, user)=>{
        if(err) return res.sendStatus(403)
        let data = createToken(type, user)
        res.status(201).json(data)
      })
    } else if(type === 'doctor'){
      jwt.verify(refreshToken, doctorRefSecret, (err, doctor)=>{
        if(err) return res.sendStatus(403)
        let data = createToken(type, doctor)
        res.status(201).json(data)
      })
    } else if(type === 'client'){
    jwt.verify(refreshToken, clientRefSecret, (err, client)=>{
      if(err) return res.sendStatus(403)
      let data = createToken(type, client)
      res.status(201).json(data)
    })
  }
  }else{
    res.status(400).json({
      message: 'invalid refreshToken'
    })
  }
}

module.exports = {
  createToken,
  verifyToken
}

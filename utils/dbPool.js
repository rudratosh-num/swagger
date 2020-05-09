const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const { dbName } = require('./collections')

const DBPool = (callback)=>{
  MongoClient.connect('mongodb://localhost:27017',
  { useUnifiedTopology: true }, (err, client) => {
    const db = client.db(dbName);
    console.log(err);
    assert.equal(null, err);
    callback(db, client);
    console.log('Connected');
  });
}

module.exports = DBPool;

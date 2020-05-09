const fs = require('fs');
const { baseUrl } = require('../exportGlobal')

const folders = [
  'about',
  'category',
  'country',
  'doctor',
  'hospital',
  'offer',
  'user'
]

const createDir = (name)=>{
  fs.mkdir(`${ baseUrl }/${ name }`, (err) => {
    if (err) {
    //    console.log(err);
    }
  //  console.log(`${ name } created successfully!`);
  });
}

createDir('images')

folders.map((e)=>{
  createDir(`images/${ e }`)
})

module.exports = createDir

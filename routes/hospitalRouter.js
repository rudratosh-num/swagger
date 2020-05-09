const Router = require ('express')
const {
  addHospital, findHospital, updateHospital,
  addInsurance, removeInsurance, addDoctor,
  removeDoctor, getHospitalById,
  addCategory, removeCategory
} = require('../models/hospitalModel')
const { checkUser } = require('../utils/tokenMiddleware')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { HasRole } = require('../utils/permissionMiddleware')
const { hospital } = require('../utils/collections')
const {
  hospitalYaml,
  hospitalInsuranceCompaniesYaml,
  doctorHospitalYaml
} = require('../schemas/validator')
const hospitalRouterLogged = Router()

/**
 * @swagger
 * path:
 *  /logged/hospital/add:
 *    post:
 *      summary: Use to add hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospital'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalResponse'
 */
hospitalRouterLogged.post('/add', HasRole(hospital, 'add'), async (req, res)=>{
  await addHospital({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "hospital added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/hospital/search/{skip}:
 *    post:
 *      summary: Use to list or search hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospital'
 *      responses:
 *        "200":
 *          description: hospital search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hospital'
 */
hospitalRouterLogged.post('/search/:skip', async (req, res)=>{
  await findHospital({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/hospital/get/{id}:
 *    get:
 *      summary: Use to get hospital by id
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: hospital id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "200":
 *          description: hospital response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Hospital'
 */
hospitalRouterLogged.post('/get/:id', async (req, res)=>{
  await getHospitalById(req.params.id, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/hospital/update/{id}:
 *    put:
 *      summary: Use to update hospital by id
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: hospital id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hospital'
 *      responses:
 *        "201":
 *          description: hospital response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalUpdateResponse'
 */
hospitalRouterLogged.put('/update/:id', HasRole(hospital, 'update'),async (req, res)=>{
  await updateHospital(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "hospital updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/hospital/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable hospital by id
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: hospital id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: hospital response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalDeleteResponse'
 */
hospitalRouterLogged.put('/delete/:id', HasRole(hospital, 'update'), async (req, res)=>{
  await updateHospital(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "hospital deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance/{id}:
 *    put:
 *      summary: Use to add insurance to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: insurance id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalInsurance'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalInsuranceResponse'
 */
hospitalRouterLogged.put('/insurance/:id', HasRole(hospital, 'add'), async (req, res)=>{
  await addInsurance(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "insurance added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance-remove/{id}:
 *    put:
 *      summary: Use to add insurance to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: insurance id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalInsuranceRemove'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalInsuranceRemoveResponse'
 */
hospitalRouterLogged.put('/insurance-remove/:id', HasRole(hospital, 'update'), async (req, res)=>{
  await removeInsurance(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'insurance deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor/{id}:
 *    put:
 *      summary: Use to add doctor to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalDoctor'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalDoctorResponse'
 */
hospitalRouterLogged.put('/doctor/:id', HasRole(hospital, 'add'), async (req, res)=>{
  await addDoctor(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "doctor added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/doctor-remove/{id}:
 *    put:
 *      summary: Use to remove doctor to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: doctor id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalDoctorRemove'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalDoctorRemoveResponse'
 */
hospitalRouterLogged.put('/doctor-remove/:id', HasRole(hospital, 'update'), async (req, res)=>{
  await removeDoctor(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'doctor deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

hospitalRouterLogged.put('/upload-image/:id', HasRole(hospital, 'add'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/hospital/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        await updateHospital(req.params.id, { image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.modifiedCount){
            res.status(201).json({ status: true, message: "image uploaded"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

/**
 * @swagger
 * path:
 *  /logged/category/{id}:
 *    put:
 *      summary: Use to add category to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: category id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalCategory'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalCategoryResponse'
 */
hospitalRouterLogged.put('/category/:id', HasRole(hospital, 'add'), async (req, res)=>{
  await addCategory(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "category added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/category-remove/{id}:
 *    put:
 *      summary: Use to remove category to hospital
 *      tags: [Hospitals]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: category id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HospitalCategoryRemove'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/HospitalCategoryRemoveResponse'
 */
hospitalRouterLogged.put('/category-remove/:id', HasRole(hospital, 'update'), async (req, res)=>{
  await removeCategory(req.params.id, { ...req.body }, checkUser(req), async (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: 'category deleted' })
    }else {
      res.status(400).json({ status: false, message: 'try again!' })
    }
  })
})

module.exports = {
  hospitalRouterLogged: hospitalRouterLogged
}

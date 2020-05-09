const Router = require ('express')
const ObjectId = require("mongodb").ObjectId
const {
  addInsurance,
  findInsurance,
  updateInsurance
} = require('../models/insuranceCompanyModel')
const { checkUser } = require('../utils/tokenMiddleware')
const { HasRole } = require('../utils/permissionMiddleware')
const { insuranceCompaney } = require('../utils/collections')

const insuranceRouterLogged = Router()

/**
 * @swagger
 * path:
 *  /logged/insurance/add:
 *    post:
 *      summary: Use to add insurance company
 *      tags: [InsuranceCompaney]
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
 *              $ref: '#/components/schemas/Insurance'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/InsuranceResponse'
 */
insuranceRouterLogged.post('/add', HasRole(insuranceCompaney, 'add'), async (req, res)=>{
  await addInsurance({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "insurance companey added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance/search/{skip}:
 *    post:
 *      summary: Use to list or search insurance company
 *      tags: [InsuranceCompaney]
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
 *              $ref: '#/components/schemas/Insurance'
 *      responses:
 *        "200":
 *          description: insurance company search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Insurance'
 */
insuranceRouterLogged.post('/search/:skip', async (req, res)=>{
  await findInsurance({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance/get/{id}:
 *    get:
 *      summary: Use to get insurance company by id
 *      tags: [InsuranceCompaney]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: insurance company id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "200":
 *          description: insurance company response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Insurance'
 */
insuranceRouterLogged.get('/get/:id', async (req, res)=>{
  await findInsurance({ _id: new ObjectId(req.params.id) }, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance/update/{id}:
 *    put:
 *      summary: Use to update insurance company by id
 *      tags: [InsuranceCompaney]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: insurance company id
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
 *              $ref: '#/components/schemas/Insurance'
 *      responses:
 *        "201":
 *          description: insurance company response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/InsuranceUpdateResponse'
 */
insuranceRouterLogged.put('/update/:id', HasRole(insuranceCompaney, 'update'), async (req, res)=>{
  await updateInsurance(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "insurance companey updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/insurance/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable insurance company by id
 *      tags: [InsuranceCompaney]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: insurance company id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: insurance company response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/InsuranceDeleteResponse'
 */
insuranceRouterLogged.put('/delete/:id', HasRole(insuranceCompaney, 'update'), async (req, res)=>{
  await updateInsurance(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "insurance company deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

module.exports = {
  insuranceRouterLogged: insuranceRouterLogged
}

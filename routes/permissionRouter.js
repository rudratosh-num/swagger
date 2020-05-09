const Router = require ('express')
const {
  addPermission, findPermission, updatePermission,
  addRole, findRole, updateRole, removeRole, removeUserToRole,
  addRoleAccess, findRoleAccess, updateRoleAccess
} = require('../models/permissionModel')
const ObjectId = require("mongodb").ObjectId
const { checkUser } = require('../utils/tokenMiddleware')
const { permission, role, roleAccess } = require('../utils/collections')
const { HasRole } = require('../utils/permissionMiddleware')

const permissionRouterLogged = Router()
const roleRouterLogged = Router()
const roleAccessRouterLogged = Router()

/**
 * @swagger
 * path:
 *  /logged/permission/add:
 *    post:
 *      summary: Use to add permission
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/Permission'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionResponse'
 */
permissionRouterLogged.post('/add', HasRole(permission, 'add'), async (req, res)=>{
  await addPermission({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "permission added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/permission/search/{skip}:
 *    post:
 *      summary: Use to list or search permission
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/Permission'
 *      responses:
 *        "200":
 *          description: permission search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Permission'
 */
permissionRouterLogged.post('/search/:skip', async (req, res)=>{
  await findPermission({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/permission/update/{id}:
 *    put:
 *      summary: Use to update permission by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: permission id
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
 *              $ref: '#/components/schemas/Permission'
 *      responses:
 *        "201":
 *          description: permission response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionUpdateResponse'
 */
permissionRouterLogged.put('/update/:id', HasRole(permission, 'update'), async (req, res)=>{
  await updatePermission(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "permission updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/permission/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable permission by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: permission id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: permission response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionDeleteResponse'
 */
permissionRouterLogged.put('/delete/:id', HasRole(permission, 'update'), async (req, res)=>{
  await updatePermission(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "permission deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role/add:
 *    post:
 *      summary: Use to add role
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleResponse'
 */
roleRouterLogged.post('/add', HasRole(role, 'add'), async (req, res)=>{
  await addRole({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "role added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role/search/{skip}:
 *    post:
 *      summary: Use to list or search role
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *        "200":
 *          description: role search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 */
roleRouterLogged.post('/search/:skip', async (req, res)=>{
  await findRole({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/role/update/{id}:
 *    put:
 *      summary: Use to update role by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: role id
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
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *        "201":
 *          description: role response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleUpdateResponse'
 */
roleRouterLogged.put('/update/:id', HasRole(role, 'update'), async (req, res)=>{
  let temp = req.body
  if(temp.permissions && temp.permissions.length>0){
    let permissions = temp.permissions.map((e, i)=>{
      return new ObjectId(e)
    })
    temp.permissions = permissions
  }
  if(temp.users && temp.users.length>0){
    let users = temp.users.map((e, i)=>{
      return new ObjectId(e)
    })
    temp.users = users
  }
  await updateRole(req.params.id, { ...temp }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "role updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable role by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: role id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: role response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleDeleteResponse'
 */
roleRouterLogged.put('/delete/:id', HasRole(role, 'update'), async (req, res)=>{
  await removeRole(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "role deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role/user/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable role user by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: role id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: role response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserRoleDeleteResponse'
 */
roleRouterLogged.put('/user/delete/:id', HasRole(role, 'update'), async (req, res)=>{
  await removeUserToRole(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "user deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role-access/add:
 *    post:
 *      summary: Use to add role-access
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/RoleAccess'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleAccessResponse'
 */
roleAccessRouterLogged.post('/add', HasRole(roleAccess, 'add'), async (req, res)=>{
  await addRoleAccess ({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "role access added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role-access/search/{skip}:
 *    post:
 *      summary: Use to list or search role access
 *      tags: [Permission]
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
 *              $ref: '#/components/schemas/RoleAccess'
 *      responses:
 *        "200":
 *          description: role access search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleAccess'
 */
roleAccessRouterLogged.post('/search/:skip', async (req, res)=>{
  await findRoleAccess ({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/role-access/update/{id}:
 *    put:
 *      summary: Use to update role-access by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: role-access id
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
 *              $ref: '#/components/schemas/RoleAccess'
 *      responses:
 *        "201":
 *          description: role-access response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleAccessUpdateResponse'
 */
roleAccessRouterLogged.put('/update/:id', HasRole(roleAccess, 'update'), async (req, res)=>{
  await updateRoleAccess (req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "role access updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/role-access/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable role-access by id
 *      tags: [Permission]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: role-access id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: role-access response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RoleAccessDeleteResponse'
 */
roleAccessRouterLogged.put('/delete/:id', HasRole(roleAccess, 'update'), async (req, res)=>{
  await updateRoleAccess (req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "role access deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

module.exports = {
  permissionRouterLogged: permissionRouterLogged,
  roleRouterLogged: roleRouterLogged,
  roleAccessRouterLogged: roleAccessRouterLogged
}

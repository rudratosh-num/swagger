//1. Permission
/**
 * @swagger
 *  components:
 *    schemas:
 *      Permission:
 *        type: object
 *        required:
 *          - name
 *          - controller
 *          - action
 *          - status
 *        properties:
 *          name:
 *            type: string
 *          controller:
 *            type: string
 *          action:
 *            type: string
 *          status:
 *            type: number
 *        example:
 *           name: add permission
 *           controller: permission
 *           action: add
 *           status: 1
 *      PermissionResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: permission added
 */

//2. Update/Delete Permission
 /**
 * @swagger
 *  components:
 *    schemas:
 *      PermissionUpdateResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: permission updated
 *      PermissionDeleteResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: permission deleted
 */

//3. Role
/**
 * @swagger
 *  components:
 *    schemas:
 *      Role:
 *        type: object
 *        required:
 *          - title
 *          - alias
 *          - is_fixed
 *        properties:
 *          title:
 *            type: string
 *          alias:
 *            type: string
 *          is_fixed:
 *            type: boolean
 *        example:
 *           title: abc xyz
 *           alias: abc xyz
 *           is_fixed: false
 *      RoleResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: role added
 */

//4. Update/Delete Role
 /**
* @swagger
*  components:
*    schemas:
*      RoleUpdateResponse:
*        type: object
*        required:
*          - status
*          - message
*        properties:
*          status:
*            type: boolean
*          message:
*            type: string
*        example:
*           status: true
*           message: role updated
*      RoleDeleteResponse:
*        type: object
*        required:
*          - status
*          - message
*        properties:
*          status:
*            type: boolean
*          message:
*            type: string
*        example:
*           status: true
*           message: role deleted
*      UserRoleDeleteResponse:
*        type: object
*        required:
*          - status
*          - message
*        properties:
*          status:
*            type: boolean
*          message:
*            type: string
*        example:
*           status: true
*           message: user deleted
*/

//5. RoleAccess
/**
 * @swagger
 *  components:
 *    schemas:
 *      RoleAccess:
 *        type: object
 *        required:
 *          - role_id
 *          - permission_id
 *        properties:
 *          role_id:
 *            type: string
 *          permission_id:
 *            type: string
 *        example:
 *           role_id: abc xyz
 *           permission_id: abc xyz
 *      RoleAccessResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: role-access added
 */

//6. Update/Delete RoleAccess
/**
 * @swagger
 *  components:
 *    schemas:
 *      RoleAccessUpdateResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: role-access updated
 *      RoleAccessDeleteResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *        example:
 *           status: true
 *           message: role-access deleted
 */

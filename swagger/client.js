//1. Client Signup
/**
 * @swagger
 *  components:
 *    schemas:
 *      ClientSignup:
 *        type: object
 *        required:
 *          - client_name
 *          - client_password
 *          - client_email
 *          - client_phone
 *          - gender
 *          - birthday
 *        properties:
 *          client_name:
 *            type: string
 *          client_password:
 *            type: string
 *          client_email:
 *            type: string
 *          client_phone:
 *            type: string
 *          gender:
 *            type: string
 *          birthday:
 *            type: string
 *        example:
 *           client_name: abc xyz
 *           client_password: dfgjk456
 *           client_email: abc@example.com
 *           client_phone: 1234567980
 *           gender: "male"
 *           birthday: 1990-04-08
 *      ClientSignupResponse:
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
 *           message: signup succuss
 */

//2.Client Login
/**
 * @swagger
 *  components:
 *    schemas:
 *      ClientLoginResponse:
 *        type: object
 *        required:
 *          - token
 *          - refreshToken
 *          - status
 *          - message
 *          - client
 *        properties:
 *          refreshToken:
 *            type: string
 *          token:
 *            type: string
 *          status:
 *            type: boolean
 *          client:
 *            type: object
 *        example:
 *           token: sdfdsfksdj...4gdf
 *           refreshToken: sdfdsfksdj...4gdf
 *           status: true
 *           message: login succuss
 *           client: {}
 */

//3. Update/Delete Client
/**
 * @swagger
 *  components:
 *    schemas:
 *      ClientUpdateResponse:
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
 *           message: client updated
 *      ClientDeleteResponse:
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
 *           message: client deleted
 */

//4. Client Favourite
/**
* @swagger
*  components:
*    schemas:
*      Favourite:
*        type: object
*        required:
*          - doctor_id
*        properties:
*          doctor_id:
*            type: string
*        example:
*           doctor_id: dffdsf456dsf4ds5
*      FavouriteAddResponse:
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
*           message: favourite doctor added
*      FavouriteRemoveResponse:
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
*           message: favourite doctor removed
*/

//5. ContactUs
/**
* @swagger
*  components:
*    schemas:
*      ContactUs:
*        type: object
*        required:
*          - title
*          - content
*          - client_id
*        properties:
*          title:
*            type: string
*          content:
*            type: string
*          client_id:
*            type: string
*        example:
*           title: abc xyz
*           content: xyz
*           client_id: 465sdfsd54dfsdc
*      ContactUsResponse:
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
*           message: contact-us added
*/

//6. Update/Delete ContactUs
/**
* @swagger
*  components:
*    schemas:
*      ContactUsUpdateResponse:
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
*           message: contact-us updated
*      ContactUsDeleteResponse:
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
*           message: contact-us deleted
*/

//7. Device
/**
* @swagger
*  components:
*    schemas:
*      Device:
*        type: object
*        required:
*          - title
*          - content
*          - client_id
*        properties:
*          title:
*            type: string
*          content:
*            type: string
*          client_id:
*            type: string
*        example:
*           title: abc xyz
*           content: xyz
*           client_id: 465sdfsd54dfsdc
*      DeviceResponse:
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
*           message: device succuss
*/

//6. Update/Delete Device
/**
* @swagger
*  components:
*    schemas:
*      DeviceUpdateResponse:
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
*           message: device updated
*      DeviceDeleteResponse:
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
*           message: device deleted
*/

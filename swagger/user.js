//1. Refresh Token
/**
 * @swagger
 *  components:
 *    schemas:
 *      RefreshToken:
 *        type: object
 *        required:
 *          - refreshToken
 *        properties:
 *          refreshToken:
 *            type: string
 *        example:
 *           refreshToken: Bearer sdfdsfksdj...4gdf
 *      RefreshTokenResponse:
 *        type: object
 *        required:
 *          - token
 *          - refreshToken
 *        properties:
 *          refreshToken:
 *            type: string
 *          token:
 *            type: string
 *        example:
 *           token: sdfdsfksdj...4gdf
 *           refreshToken: sdfdsfksdj...4gdf
 */

//2. User Signup
/**
 * @swagger
 *  components:
 *    schemas:
 *      UserSignup:
 *        type: object
 *        required:
 *          - user_name
 *          - user_password
 *          - user_email
 *          - user_phone
 *        properties:
 *          user_name:
 *            type: string
 *          user_password:
 *            type: string
 *          user_email:
 *            type: string
 *          user_phone:
 *            type: string
 *        example:
 *           user_name: abc xyz
 *           user_password: dfgjk456
 *           user_email: abc@example.com
 *           user_phone: 1234567980
 *      UserSignupResponse:
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

//3. Login
/**
 * @swagger
 *  components:
 *    schemas:
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *           email: abc@example.com
 *           password: dgd45gdfd
 *      UserLoginResponse:
 *        type: object
 *        required:
 *          - token
 *          - refreshToken
 *          - status
 *          - message
 *          - user
 *        properties:
 *          refreshToken:
 *            type: string
 *          token:
 *            type: string
 *          status:
 *            type: boolean
 *          user:
 *            type: object
 *        example:
 *           token: sdfdsfksdj...4gdf
 *           refreshToken: sdfdsfksdj...4gdf
 *           status: true
 *           message: login succuss
 *           user: {}
 */

//4. Forget Password
/**
 * @swagger
 *  components:
 *    schemas:
 *      ForgetPassword:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *        example:
 *           email: abc@example.com
 *      ForgetPasswordResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *          - token
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *          token:
 *            type: string
 *        example:
 *           status: true
 *           message: reset link sent
 *           token: sdfdsfksdj...4gdf
 */

//5. Reset Password
 /**
 * @swagger
 *  components:
 *    schemas:
 *      ResetPassword:
 *        type: object
 *        required:
 *          - token
 *          - password
 *        properties:
 *          token:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *           token: dfdf45
 *           password: dfhdf45
 *      ResetPasswordResponse:
 *        type: object
 *        required:
 *          - status
 *          - message
 *        properties:
 *          status:
 *            type: boolean
 *          message:
 *            type: string
 *          token:
 *            type: string
 *        example:
 *           status: true
 *           message: password changed
 */

//6. UserSearch
/**
 * @swagger
 *  components:
 *    schemas:
 *      UserSearch:
 *        type: object
 *        properties:
 *          user_name:
 *            type: string
 *          user_email:
 *            type: string
 *          user_phone:
 *            type: string
 *        example:
 *           user_name: abc xyz
 *           user_email: abc@example.com
 *           user_phone: 7897416582
 */

//7. UserUpdate
/**
 * @swagger
 *  components:
 *    schemas:
 *      UserUpdate:
 *        type: object
 *        properties:
 *          user_name:
 *            type: string
 *          user_email:
 *            type: string
 *          user_phone:
 *            type: string
 *        example:
 *           user_name: abc xyz
 *           user_email: abc@example.com
 *           user_phone: 7897416582
 *      UserUpdateResponse:
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
 *           message: user updated
 */

//8. UserConfirmResponse and UserDeleteResponse
/**
  * @swagger
  *  components:
  *    schemas:
  *      UserConfirmResponse:
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
  *           message: user verified
  *      UserDeleteResponse:
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

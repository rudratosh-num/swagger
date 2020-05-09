//1. Doctor Signup
/**
 * @swagger
 *  components:
 *    schemas:
 *      DoctorSignup:
 *        type: object
 *        required:
 *          - nickname
 *          - doctor_name_ar
 *          - doctor_name_en
 *          - doctor_description_ar
 *          - doctor_description_en
 *          - specialist
 *          - email
 *          - password
 *          - phone
 *          - gender
 *          - price
 *          - waiting_period
 *          - discount_copon
 *        properties:
 *          nickname:
 *            type: string
 *          doctor_name_ar:
 *            type: string
 *          doctor_name_en:
 *            type: string
 *          doctor_description_ar:
 *            type: string
 *          doctor_description_en:
 *            type: string
 *          specialist:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          phone:
 *            type: string
 *          gender:
 *            type: number
 *          price:
 *            type: number
 *          waiting_period:
 *            type: number
 *          discount_copon:
 *            type: number
 *        example:
 *           nickname: abc xyz
 *           doctor_name_ar: dfgjk456
 *           doctor_name_en: abc@example.com
 *           doctor_description_ar: 1234567980
 *           doctor_description_en: 1234567980
 *           specialist: 1234567980
 *           email: 1234567980
 *           password: 1234567980
 *           phone: 1234567980
 *           gender: 1234567980
 *           price: 1234567980
 *           waiting_period: 1234567980
 *           discount_copon: 1234567980
 *      DoctorSignupResponse:
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

//2. Doctor Login
/**
 * @swagger
 *  components:
 *    schemas:
 *      DoctorLoginResponse:
 *        type: object
 *        required:
 *          - token
 *          - refreshToken
 *          - status
 *          - message
 *          - doctor
 *        properties:
 *          refreshToken:
 *            type: string
 *          token:
 *            type: string
 *          status:
 *            type: boolean
 *          doctor:
 *            type: object
 *        example:
 *           token: sdfdsfksdj...4gdf
 *           refreshToken: sdfdsfksdj...4gdf
 *           status: true
 *           message: login succuss
 *           doctor: {}
 */

//3. Update/Delete Doctor
/**
 * @swagger
 *  components:
 *    schemas:
 *      DoctorUpdateResponse:
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
 *           message: doctor updated
 *      DoctorDeleteResponse:
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
 *           message: doctor deleted
 */

//4. Vacation
/**
* @swagger
*  components:
*    schemas:
*      Vacation:
*        type: object
*        required:
*          - doctor_id
*          - start_date
*          - end_date
*          - period
*        properties:
*          doctor_id:
*            type: string
*          start_date:
*            type: date
*          end_date:
*            type: date
*          period:
*            type: number
*        example:
*           doctor_id: abc xyz
*           start_date: 2020-05-08
*           end_date: 2020-05-10
*           period: 1
*      VacationResponse:
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
*           message: vacation added
*/

//5. Update/Delete Vacation
/**
* @swagger
*  components:
*    schemas:
*      VacationUpdateResponse:
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
*           message: vacation updated
*      VacationDeleteResponse:
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
*           message: vacation deleted
*/

//6. Category
/**
* @swagger
*  components:
*    schemas:
*      Category:
*        type: object
*        required:
*          - category_id
*        properties:
*          category_id:
*            type: string
*        example:
*           category_id: abcxyzfdsf45
*      CategoryResponse:
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
*           message: category added
*/

//7. Delete Category
/**
* @swagger
*  components:
*    schemas:
*      CategoryDeleteResponse:
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
*           message: category_id deleted
*/

//8. Appointment
/**
* @swagger
*  components:
*    schemas:
*      Appointment:
*        type: object
*        required:
*          - week_day_id
*          - period
*          - period_from
*          - period_to
*        properties:
*          week_day_id:
*            type: string
*          period:
*            type: number
*          period_from:
*            type: date
*          period_to:
*            type: date
*        example:
*           week_day_id: 5ea683cdd2f28717910b4bc0
*           period: 1
*           period_from: 2020-05-08
*           period_to: 2020-05-10
*      AppointmentResponse:
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
*           message: appointment added
*/

//9. Update/Delete Appointment
/**
* @swagger
*  components:
*    schemas:
*      AppointmentUpdateResponse:
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
*           message: appointment updated
*      AppointmentDeleteResponse:
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
*           message: appointment deleted
*/

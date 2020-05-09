//1. Offer
/**
 * @swagger
 *  components:
 *    schemas:
 *      Offer:
 *        type: object
 *        required:
 *          - doctor_id
 *          - category_id
 *          - hospital_id
 *          - title_ar
 *          - title_en
 *          - description_ar
 *          - description_en
 *          - discount_per
 *          - price_after_disc
 *          - price_before_disc
 *          - views_num
 *          - start_date
 *          - end_date
 *        properties:
 *          doctor_id:
 *            type: string
 *          category_id:
 *            type: string
 *          hospital_id:
 *            type: string
 *          title_ar:
 *            type: string
 *          title_en:
 *            type: string
 *          description_ar:
 *            type: string
 *          description_en:
 *            type: string
 *          discount_per:
 *            type: number
 *          price_after_disc:
 *            type: number
 *          price_before_disc:
 *            type: number
 *          views_num:
 *            type: number
 *          start_date:
 *            type: date
 *          end_date:
 *            type: date
 *        example:
 *          doctor_id: 5ea676283ca1d30b6822d0c3
 *          category_id: 5ea676283ca1d30b6822d0c3
 *          hospital_id: 5ea676283ca1d30b6822d0c3
 *          title_ar: abc
 *          title_en: abc
 *          description_ar: abc
 *          description_en: abc
 *          discount_per: 12
 *          price_after_disc: 30
 *          price_before_disc: 20
 *          views_num: 0
 *          start_date: 2020-05-01
 *          end_date: 2020-05-10
 *      OfferResponse:
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
 *           message: offer added
 */

//2. Update/Delete Offer
/**
 * @swagger
 *  components:
 *    schemas:
 *      OfferUpdateResponse:
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
 *           message: offer updated
 *      OfferDeleteResponse:
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
 *           message: offer deleted
 */

//3. Reservation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Reservation:
 *        type: object
 *        required:
 *          - client_id
 *          - reservation_time
 *          - reservation_date
 *          - status
 *          - reason
 *        properties:
 *          client_id:
 *            type: string
 *          reservation_time:
 *            type: string
 *          reservation_date:
 *            type: date
 *          status:
 *            type: number
 *          reason:
 *        example:
 *          client_id: 5ea676283ca1d30b6822d0c3
 *          reservation_time: "12:00 PM"
 *          reservation_date: "2020-05-08"
 *          status: 1
 *          reason: abc
 *      ReservationResponse:
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
 *           message: reservation added
 */

//4. Update/Delete Reservation
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationUpdateResponse:
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
 *           message: reservation updated
 *      ReservationDeleteResponse:
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
 *           message: reservation deleted
 */

//3. Reservation Comment
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationComment:
 *        type: object
 *        required:
 *          - comment
 *          - category_id
 *          - rate_status
 *        properties:
 *          comment:
 *            type: string
 *          rate:
 *            type: number
 *          rate_status:
 *            type: string
 *        example:
 *          comment: abc
 *          rate: 5
 *          rate_status: 5
 *      ReservationCommentResponse:
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
 *           message: reservation comment added
 */

//4. Update/Delete Reservation Comment
/**
 * @swagger
 *  components:
 *    schemas:
 *      ReservationCommentUpdateResponse:
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
 *           message: reservation comment updated
 *      ReservationCommentDeleteResponse:
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
 *           message: reservation comment deleted
 */

//7. Appointment
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
 *          week_day_id: 5ea676283ca1d30b6822d0c3
 *          period: 1
 *          period_from: 2020-05-04
 *          period_to: 2020-05-08
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

//8. Update/Delete Appointment
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

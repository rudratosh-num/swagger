//1. Insurance
/**
 * @swagger
 *  components:
 *    schemas:
 *      Insurance:
 *        type: object
 *        required:
 *          - company_name_en
 *          - company_name_ar
 *          - country_id
 *        properties:
 *          company_name_en:
 *            type: string
 *          company_name_ar:
 *            type: string
 *          country_id:
 *            type: string
 *        example:
 *           company_name_en: abc xyz
 *           company_name_ar: abc xyz
 *           country_id: 5ea676283ca1d30b6822d0c3
 *      InsuranceResponse:
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
 *           message: insurance company added
 */

//2. Update/Delete Insurance
/**
 * @swagger
 *  components:
 *    schemas:
 *      InsuranceUpdateResponse:
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
 *           message: insurance company updated
 *      InsuranceDeleteResponse:
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
 *           message: insurance company deleted
 */

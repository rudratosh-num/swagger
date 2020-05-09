//1. Hospital
/**
 * @swagger
 *  components:
 *    schemas:
 *      Hospital:
 *        type: object
 *        required:
 *          - hospital_name_ar
 *          - hospital_name_en
 *          - address_ar
 *          - address_en
 *          - country_id
 *          - city_id
 *          - region_id
 *          - longitude
 *          - latitude
 *        properties:
 *          hospital_name_ar:
 *            type: string
 *          hospital_name_en:
 *            type: string
 *          address_ar:
 *            type: string
 *          address_en:
 *            type: string
 *          country_id:
 *            type: string
 *          city_id:
 *            type: string
 *          region_id:
 *            type: string
 *          longitude:
 *            type: number
 *          latitude:
 *            type: number
 *        example:
 *           hospital_name_ar: abc xyz
 *           hospital_name_en: abc xyz
 *           address_ar: xyz
 *           address_en: xyz
 *           country_id: 5ea67ac810dc3412a5142a7c
 *           city_id: 5ea67ac810dc3412a5142a7c
 *           region_id: 5ea67ac810dc3412a5142a7c
 *           longitude: 45.5
 *           latitude: 35.8
 *      HospitalResponse:
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
 *           message: hospital added
 */

//2. Update/Delete Hospital
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalUpdateResponse:
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
 *           message: hospital updated
 *      HospitalDeleteResponse:
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
 *           message: hospital deleted
 */

//3. HospitalInsurance
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalInsurance:
 *        type: object
 *        required:
 *          - company_id
 *        properties:
 *          company_id:
 *            type: string
 *        example:
 *           company_id: sdjgklsd4654dgfgf
 *      HospitalInsuranceResponse:
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
 *           message: insurance added
 */

//4. HospitalInsuranceRemove
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalInsuranceRemove:
 *        type: object
 *        required:
 *          - company_id
 *        properties:
 *          company_id:
 *            type: string
 *        example:
 *           company_id: sdjgklsd4654dgfgf
 *      HospitalInsuranceRemoveResponse:
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
 *           message: insurance deleted
 */

//5. HospitalDoctor
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalDoctor:
 *        type: object
 *        required:
 *          - doctor_id
 *        properties:
 *          doctor_id:
 *            type: string
 *        example:
 *           doctor_id: sdjgklsd4654dgfgf
 *      HospitalDoctorResponse:
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
 *           message: doctor added
 */

//6. HospitalDoctorRemove
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalDoctorRemove:
 *        type: object
 *        required:
 *          - doctor_id
 *        properties:
 *          doctor_id:
 *            type: string
 *        example:
 *           doctor_id: sdjgklsd4654dgfgf
 *      HospitalDoctorRemoveResponse:
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

//7. HospitalCategory
/**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalCategory:
 *        type: object
 *        required:
 *          - category_id
 *        properties:
 *          category_id:
 *            type: string
 *        example:
 *           category_id: sdjgklsd4654dgfgf
 *      HospitalCategoryResponse:
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

 //7. HospitalCategoryRemove
 /**
 * @swagger
 *  components:
 *    schemas:
 *      HospitalCategoryRemove:
 *        type: object
 *        required:
 *          - category_id
 *        properties:
 *          category_id:
 *            type: string
 *        example:
 *           category_id: sdjgklsd4654dgfgf
 *      HospitalCategoryRemoveResponse:
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
 *           message: category deleted
 */

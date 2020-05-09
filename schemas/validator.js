const Joi = require('@hapi/joi');
const moment = require('moment')

let userSchema = Joi.object({
  user_name: Joi.string().required(),
  user_password: Joi.string().required(),
  user_email: Joi.string().email().required(),
  user_phone: Joi.string().required(),
  user_image: Joi.string(),
  status: Joi.number().default(1),
  verified: Joi.number().default(0),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let aboutSchema = Joi.object({
  title_ar: Joi.string().required(),
  title_en: Joi.string().required(),
  description_ar: Joi.string().required(),
  description_en: Joi.string().required(),
  image: Joi.string(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let categoriesSchema = Joi.object({
  category_name_ar: Joi.string().required(),
  category_name_en: Joi.string().required(),
  image: Joi.string(),//.required(),
  Type: Joi.number(),
  parent_id: Joi.string(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let citiesSchema = Joi.object({
  country_id: Joi.string(),
  city_name_ar: Joi.string().required(),
  city_name_en: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let clientSchema = Joi.object({
  client_name: Joi.string().required(),
  client_password: Joi.string().required(),
  client_email: Joi.string().email().required(),
  client_phone: Joi.string().required(),
  gender: Joi.string().required(),
  birthday: Joi.date().iso(),
  client_verify: Joi.number().default(0),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  favourite: Joi.array(),
  device: Joi.array(),
  delete: Joi.boolean().default(false)
})

let clientFavSchema = Joi.object({
  //client_id: Joi.string().required(),
  doctor_id: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let commentsSchema = Joi.object({
  doctor_id: Joi.string().required(),
  client_id: Joi.string(),
  comment: Joi.string(),
  rate: Joi.number(),
  rate_status: Joi.number(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let contactSchema = Joi.object({
  about_us: Joi.string().required(),
  address_ar: Joi.string().required(),
  address_en: Joi.string().required(),
  phone: Joi.string().required(),
  mobile: Joi.string().required(),
  email: Joi.string().email().required(),
  instagram: Joi.string().required(),
  twitter: Joi.string().required(),
  facebook: Joi.string().required(),
  website: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let contactUsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  client_id: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let countriesSchema = Joi.object({
  country_name_ar: Joi.string().required(),
  country_name_en: Joi.string().required(),
  code: Joi.string().required(),
  currency: Joi.string().required(),
  image: Joi.string(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let devicesSchema = Joi.object({
  client_id: Joi.string().required(),
  login: Joi.number().required(),
  device_token: Joi.string().required(),
  type: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let doctorSchema = Joi.object({
  nickname: Joi.number().required(), // '1=>doctor&2=>specialist&3=>consultant',
  doctor_name_ar: Joi.string().required(),
  doctor_name_en: Joi.string().required(),
  doctor_description_ar: Joi.string().required(),
  doctor_description_en: Joi.string().required(),
  specialist: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.number().required(),
  gender: Joi.number(), //'1=>female&2=>male',
  image: Joi.string(),
  verified: Joi.number().default(0),
  price: Joi.number().required(),
  waiting_period: Joi.number().required(),
  discount_copon: Joi.number(), //'0=>no&1=>yes',
  display: Joi.number().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  categories: Joi.array(),
  delete: Joi.boolean().default(false)
})

// const appointmentTime = [
//   "00:00 am", "00:30 am", "01:00 am", "01:30 am",
//   "02:00 am", "02:30 am", "03:00 am", "03:30 am",
//   "04:00 am", "04:30 am", "05:00 am", "05:30 am",
//   "06:00 am", "06:30 am", "07:00 am", "07:30 am",
//   "08:00 am", "08:30 am", "09:00 am", "09:30 am",
//   "10:00 am", "10:30 am", "11:00 am", "11:30 am",
//   "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm",
//   "02:00 pm", "02:30 pm", "03:00 pm", "03:30 pm",
//   "04:00 pm", "04:30 pm", "05:00 pm", "05:30 pm",
//   "06:00 pm", "06:30 pm", "07:00 pm", "07:30 pm",
//   "08:00 pm", "08:30 pm", "09:00 pm", "09:30 pm",
//   "10:00 pm", "10:30 pm", "11:00 pm", "11:30 pm"
// ]
//
// let doctorAppSchema = Joi.object({
//   doctor_id: Joi.string().required(),
//   day_id: Joi.string().required(),
//   date: Joi.date().iso(),
//   time: Joi.any().valid(appointmentTime).required(),
//   date_added: Joi.date().iso(),
//   date_modified: Joi.date().iso(),
//   user_modified: Joi.string(),
//   delete: Joi.boolean().default(false)
// })

let doctorAppointmentSchema = Joi.object({
  doctor_id: Joi.string().required(),
  week_day_id: Joi.string().required(),
  period: Joi.number(), // COMMENT 'صباحي =>0& مسائي =>1',
  period_from: Joi.date().iso().required(),
  period_to: Joi.date().iso().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let doctorCategoriesSchema = Joi.object({
  //doctor_id: Joi.string().required(),
  category_id: Joi.string().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let doctorHospitalSchema = Joi.object({
  doctor_id: Joi.string().required(),
//  hospital_id: Joi.string().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let doctorVacationSchema = Joi.object({
  doctor_id: Joi.string().required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  period: Joi.number().required(), // 'طول اليوم =>3& صباحي =>1& مسائي =>2',
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let hospitalCategoriesSchema = Joi.object({
//  hospital_id: Joi.string().required(),
  category_id: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let insuranceCompaniesSchema = Joi.object({
  company_name_en: Joi.string().required(),
  company_name_ar: Joi.string().required(),
  country_id: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let hospitalInsuranceCompaniesSchema = Joi.object({
  //hospital_id: Joi.string().required(),
  company_id: Joi.string().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let hospitalSchema = Joi.object({
  hospital_name_ar: Joi.string().required(),
  hospital_name_en: Joi.string().required(),
  image: Joi.string(),
  address_ar: Joi.string().required(),
  address_en: Joi.string().required(),
  country_id: Joi.string().required(),
  city_id: Joi.string().required(),
  region_id: Joi.string().required(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  doctors: Joi.array(),
  insuranceCompany: Joi.array(),
  categories: Joi.array(),
  delete: Joi.boolean().default(false)
})

let notificationSchema = Joi.object({
  client_id: Joi.string().required(),
  doctor_id: Joi.string().required(),
  template_id: Joi.string().required(),
  message_ar: Joi.string().required(),
  message_en: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.number().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let offerCommentsSchema = Joi.object({
//  reservation_id: Joi.string().required(),
  comment: Joi.string().required(),
  rate: Joi.number().required(),
  rate_status: Joi.number(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let offersReservationsSchema = Joi.object({
  client_id: Joi.string().required(),
  //offer_id: Joi.string().required(),
  reservation_time: Joi.string().required(),
  reservation_date: Joi.date().iso().required(),
  status: Joi.number().required(), //COMMENT '1=>under review&2=>approved&3=>denied &4=>complete',
  reason: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  comments: Joi.array(),
  delete: Joi.boolean().default(false)
})

let offerAppointmentSchema = Joi.object({
//  offer_id: Joi.string().required(),
  week_day_id: Joi.string().required(),
  period: Joi.number().required(), // COMMENT 'صباحي =>0& مسائي =>1',
  period_from: Joi.date().iso().required(),
  period_to: Joi.date().iso().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let offerImagesSchema = Joi.object({
//  offer_id: Joi.string().required(),
  image: Joi.string().required(),
  user_modified: Joi.string(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let offerSchema = Joi.object({
  doctor_id: Joi.string().required(),
  category_id: Joi.string().required(),
  hospital_id: Joi.string().required(),
  title_ar: Joi.string().required(),
  title_en: Joi.string().required(),
  description_ar: Joi.string().required(),
  description_en: Joi.string().required(),
  discount_per: Joi.number().positive().precision(2).required(),
  price_after_disc: Joi.number().positive().precision(2).required(),
  price_before_disc: Joi.number().positive().precision(2).required(),
  views_num: Joi.number().required(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required(),
  display: Joi.number().required(), // COMMENT 'اخفاء =>0& اظهار العرض =>1',
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  images: Joi.array(), // offerImagesSchema,
  appointment: Joi.array(), // offerAppointmentSchema
  reservations: Joi.array(), //offersReservationsSchema
  delete: Joi.boolean().default(false)
})

let permissionSchema = Joi.object({
//  parent_id: Joi.string().required(),
  name: Joi.string().required(),
  controller: Joi.string().required(),
  action: Joi.string().required(),
  status: Joi.number().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  user_modified: Joi.string(),
  date_modified: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let regionSchema = Joi.object({
  city_id: Joi.string().required(),
  country_id: Joi.string().required(),
  region_name_ar: Joi.string().required(),
  region_name_en: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let reservationsSchema = Joi.object({
  client_id: Joi.string().required(),
  doctor_id: Joi.string().required(),
  reservation_time: Joi.string().required(),
  reservation_date: Joi.date().iso().required(),
  status: Joi.number().required(), // COMMENT '1=>under review&2=>approved&3=>denied &4=>complete',
  reason: Joi.string(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let roleSchema = Joi.object({
  title: Joi.string().required(),
  alias: Joi.string().required(),
  is_fixed: Joi.boolean().required(),
  permissions: Joi.array(),
  users: Joi.array(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  user_modified: Joi.string(),
  date_modified: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let roleAccessSchema = Joi.object({
  role_id: Joi.string().required(),
  permission_id: Joi.string().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  user_modified: Joi.string(),
  date_modified: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let settingSchema = Joi.object({
  hospital_id: Joi.string().required(),
  accept_reservation: Joi.number().required(),
  cancel_reservation_period: Joi.number().required(),
  discount: Joi.number().required(),
  discount_percentage: Joi.number().required(),
  user_created: Joi.string(),
  date_added: Joi.date().iso(),
  user_modified: Joi.string(),
  date_modified: Joi.date().iso(),
  delete: Joi.boolean().default(false)
})

let templateMessagesSchema = Joi.object({
  title: Joi.string().required(),
  subject_ar: Joi.string().required(),
  subject_en: Joi.string().required(),
  message_ar: Joi.string().required(),
  message_en: Joi.string().required(),
  sender: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let webViewSchema = Joi.object({
  link: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

let weekDaysSchema = Joi.object({
  day_name_ar: Joi.string().required(),
  day_name_en: Joi.string().required(),
  nikname: Joi.string().required(),
  date_added: Joi.date().iso(),
  user_created: Joi.string(),
  date_modified: Joi.date().iso(),
  user_modified: Joi.string(),
  delete: Joi.boolean().default(false)
})

module.exports = {
  userSchema: userSchema, //completed
  aboutSchema: aboutSchema, //completed
  citiesSchema: citiesSchema, //completed
  contactSchema: contactSchema, //completed
  contactUsSchema: contactUsSchema, //completed
  countriesSchema: countriesSchema, //completed
  regionSchema: regionSchema, //completed
  clientSchema: clientSchema, //completed
  clientFavSchema: clientFavSchema, //completed
  commentsSchema: commentsSchema,
  categoriesSchema: categoriesSchema, //completed
  devicesSchema: devicesSchema,
  doctorSchema: doctorSchema, //completed
//  doctorAppSchema: doctorAppSchema,
//  appointmentTime: appointmentTime,
  doctorAppointmentSchema: doctorAppointmentSchema, //completed
  doctorCategoriesSchema: doctorCategoriesSchema, //completed
  doctorHospitalSchema: doctorHospitalSchema, //completed
  doctorVacationSchema: doctorVacationSchema, //completed
  hospitalSchema: hospitalSchema,  //completed // -> doctorHospitalSchema, -> hospitalInsuranceCompaniesSchema
  hospitalCategoriesSchema: hospitalCategoriesSchema,
  hospitalInsuranceCompaniesSchema: hospitalInsuranceCompaniesSchema, //completed
  insuranceCompaniesSchema: insuranceCompaniesSchema, //completed
  notificationSchema: notificationSchema, //completed
  offerSchema: offerSchema,  //completed // -> offerImagesSchema, -> offerAppointmentSchema -> offersReservationsSchema
  offerImagesSchema: offerImagesSchema,  //completed
  offersReservationsSchema: offersReservationsSchema, //completed
  offerAppointmentSchema: offerAppointmentSchema, //completed
  offerCommentsSchema: offerCommentsSchema, //completed
  permissionSchema: permissionSchema, //completed
  reservationsSchema: reservationsSchema,
  roleSchema: roleSchema, //completed
  roleAccessSchema: roleAccessSchema, //completed
  settingSchema: settingSchema, //completed
  templateMessagesSchema: templateMessagesSchema, //completed
  webViewSchema: webViewSchema, //completed
  weekDaysSchema: weekDaysSchema //completed
}

//doctorHospitalSchema
//hospitalInsuranceCompaniesSchema

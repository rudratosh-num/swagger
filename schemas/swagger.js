const j2s = require('joi-to-swagger');
const YAML = require('json-to-pretty-yaml');
const {
  userSchema, aboutSchema, citiesSchema, contactSchema, contactUsSchema, countriesSchema,
  regionSchema, clientSchema, clientFavSchema, commentsSchema, categoriesSchema, devicesSchema,
  doctorSchema, doctorAppointmentSchema, doctorCategoriesSchema, doctorHospitalSchema,
  doctorVacationSchema, hospitalSchema, hospitalCategoriesSchema, hospitalInsuranceCompaniesSchema,
  insuranceCompaniesSchema, notificationSchema, offerSchema, offerImagesSchema, offersReservationsSchema,
  offerAppointmentSchema, offerCommentsSchema, permissionSchema, reservationsSchema, roleSchema,
  roleAccessSchema, settingSchema, templateMessagesSchema, webViewSchema, weekDaysSchema
} = require('../schemas/validator')

const user = j2s(userSchema);
const about = j2s(aboutSchema);
const cities = j2s(citiesSchema);
const contact = j2s(contactSchema);
const contactUs = j2s(contactUsSchema);
const countries = j2s(countriesSchema);
const region = j2s(regionSchema);
const client = j2s(clientSchema);
const comments = j2s(commentsSchema);
const categories = j2s(categoriesSchema);
const devices = j2s(devicesSchema);
const doctor = j2s(doctorSchema);
const doctorAppointment = j2s(doctorAppointmentSchema);
const doctorCategories = j2s(doctorCategoriesSchema);
const doctorHospital = j2s(doctorHospitalSchema);
const doctorVacation = j2s(doctorVacationSchema);
const hospital = j2s(hospitalSchema);
const hospitalCategories = j2s(hospitalCategoriesSchema);
const hospitalInsuranceCompanies = j2s(hospitalInsuranceCompaniesSchema);
const insuranceCompanies = j2s(insuranceCompaniesSchema);
const notification = j2s(notificationSchema);
const offer = j2s(offerSchema);
const offerImages = j2s(offerImagesSchema);
const offersReservations = j2s(offersReservationsSchema);
const offerAppointment = j2s(offerAppointmentSchema);
const offerComments = j2s(offerCommentsSchema);
const permission = j2s(permissionSchema);
const reservations = j2s(reservationsSchema);
const role = j2s(roleSchema);
const roleAccess = j2s(roleAccessSchema);
const setting = j2s(settingSchema);
const templateMessages = j2s(templateMessagesSchema);
const webView = j2s(webViewSchema);
const weekDays = j2s(weekDaysSchema);

module.exports = {
  userYaml: YAML.stringify(user.swagger),
  aboutYaml: YAML.stringify(about.swagger),
  citiesYaml: YAML.stringify(cities.swagger),
  contactYaml: YAML.stringify(contact.swagger),
  contactUsYaml: YAML.stringify(contactUs.swagger),
  countriesYaml: YAML.stringify(countries.swagger),
  regionYaml: YAML.stringify(region.swagger),
  clientYaml: YAML.stringify(client.swagger),
  commentsYaml: YAML.stringify(comments.swagger),
  categoriesYaml: YAML.stringify(categories.swagger),
  devicesYaml: YAML.stringify(devices.swagger),
  doctorYaml: YAML.stringify(doctor.swagger),
  doctorAppointmentYaml: YAML.stringify(doctorAppointment.swagger),
  doctorCategoriesYaml: YAML.stringify(doctorCategories.swagger),
  doctorHospitalYaml: YAML.stringify(doctorHospital.swagger),
  doctorVacationYaml: YAML.stringify(doctorVacation.swagger),
  hospitalYaml: YAML.stringify(hospital.swagger),
  hospitalCategoriesYaml: YAML.stringify(hospitalCategories.swagger),
  hospitalInsuranceCompaniesYaml: YAML.stringify(hospitalInsuranceCompanies.swagger),
  insuranceCompaniesYaml: YAML.stringify(insuranceCompanies.swagger),
  notificationYaml: YAML.stringify(notification.swagger),
  offerYaml: YAML.stringify(offer.swagger),
  offerImagesYaml: YAML.stringify(offerImages.swagger),
  offersReservationsYaml: YAML.stringify(offersReservations.swagger),
  offerAppointmentYaml: YAML.stringify(offerAppointment.swagger),
  offerCommentsYaml: YAML.stringify(offerComments.swagger),
  permissionYaml: YAML.stringify(permission.swagger),
  reservationsYaml: YAML.stringify(reservations.swagger),
  roleYaml: YAML.stringify(role.swagger),
  roleAccessYaml: YAML.stringify(roleAccess.swagger),
  settingYaml: YAML.stringify(setting.swagger),
  templateMessagesYaml: YAML.stringify(templateMessages.swagger),
  webViewYaml: YAML.stringify(webView.swagger),
  weekDaysYaml: YAML.stringify(weekDays.swagger)
}

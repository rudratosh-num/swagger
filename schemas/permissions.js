// add, view, update

const permissions = [
  {
    "name": "add user",
    "controller": "user",
    "action": "add",
    "status": 1
  },
  {
    "name": "view user",
    "controller": "user",
    "action": "view",
    "status": 1
  },
  {
    "name": "update user",
    "controller": "user",
    "action": "update",
    "status": 1
  },
  {
    "name": "add hospital",
    "controller": "hospital",
    "action": "add",
    "status": 1
  },
  {
    "name": "view hospital",
    "controller": "hospital",
    "action": "view",
    "status": 1
  },
  {
    "name": "update hospital",
    "controller": "hospital",
    "action": "update",
    "status": 1
  },
  {
    "name": "add insurance companey",
    "controller": "insuranceCompaney",
    "action": "add",
    "status": 1
  },
  {
    "name": "view insurance companey",
    "controller": "insuranceCompaney",
    "action": "view",
    "status": 1
  },
  {
    "name": "update insurance companey",
    "controller": "insuranceCompaney",
    "action": "update",
    "status": 1
  },
  {
    "name": "add doctor",
    "controller": "doctor",
    "action": "add",
    "status": 1
  },
  {
    "name": "view doctor",
    "controller": "doctor",
    "action": "view",
    "status": 1
  },
  {
    "name": "update doctor",
    "controller": "doctor",
    "action": "update",
    "status": 1
  },
  {
    "name": "add doctor vacation",
    "controller": "doctorVacation",
    "action": "add",
    "status": 1
  },
  {
    "name": "view doctor vacation",
    "controller": "doctorVacation",
    "action": "view",
    "status": 1
  },
  {
    "name": "update doctor vacation",
    "controller": "doctorVacation",
    "action": "update",
    "status": 1
  },
  {
    "name": "add doctor appointment",
    "controller": "doctorAppointment",
    "action": "add",
    "status": 1
  },
  {
    "name": "view doctor appointment",
    "controller": "doctorAppointment",
    "action": "view",
    "status": 1
  },
  {
    "name": "update doctor appointment",
    "controller": "doctorAppointment",
    "action": "update",
    "status": 1
  },
  {
    "name": "add client",
    "controller": "client",
    "action": "add",
    "status": 1
  },
  {
    "name": "view client",
    "controller": "client",
    "action": "view",
    "status": 1
  },
  {
    "name": "update client",
    "controller": "client",
    "action": "update",
    "status": 1
  },
  {
    "name": "add client device",
    "controller": "client_devices",
    "action": "add",
    "status": 1
  },
  {
    "name": "view client device",
    "controller": "client_devices",
    "action": "view",
    "status": 1
  },
  {
    "name": "update client device",
    "controller": "client_devices",
    "action": "update",
    "status": 1
  },
  {
    "name": "add about",
    "controller": "about",
    "action": "add",
    "status": 1
  },
  {
    "name": "view about",
    "controller": "about",
    "action": "view",
    "status": 1
  },
  {
    "name": "update about",
    "controller": "about",
    "action": "update",
    "status": 1
  },
  {
    "name": "add cities",
    "controller": "cities",
    "action": "add",
    "status": 1
  },
  {
    "name": "view cities",
    "controller": "cities",
    "action": "view",
    "status": 1
  },
  {
    "name": "update cities",
    "controller": "cities",
    "action": "update",
    "status": 1
  },
  {
    "name": "add contact",
    "controller": "contact",
    "action": "add",
    "status": 1
  },
  {
    "name": "view contact",
    "controller": "contact",
    "action": "view",
    "status": 1
  },
  {
    "name": "update contact",
    "controller": "contact",
    "action": "update",
    "status": 1
  },
  {
    "name": "add contact-us",
    "controller": "contactUs",
    "action": "add",
    "status": 1
  },
  {
    "name": "view contact-us",
    "controller": "contactUs",
    "action": "view",
    "status": 1
  },
  {
    "name": "update contact-us",
    "controller": "contactUs",
    "action": "update",
    "status": 1
  },
  {
    "name": "add week days",
    "controller": "weekDays",
    "action": "add",
    "status": 1
  },
  {
    "name": "view week days",
    "controller": "weekDays",
    "action": "view",
    "status": 1
  },
  {
    "name": "update week days",
    "controller": "weekDays",
    "action": "update",
    "status": 1
  },
  {
    "name": "add regions",
    "controller": "regions",
    "action": "add",
    "status": 1
  },
  {
    "name": "view regions",
    "controller": "regions",
    "action": "view",
    "status": 1
  },
  {
    "name": "update regions",
    "controller": "regions",
    "action": "update",
    "status": 1
  },
  {
    "name": "add offer",
    "controller": "offer",
    "action": "add",
    "status": 1
  },
  {
    "name": "view offer",
    "controller": "offer",
    "action": "view",
    "status": 1
  },
  {
    "name": "update offer",
    "controller": "offer",
    "action": "update",
    "status": 1
  },
  {
    "name": "add offer images",
    "controller": "offerImages",
    "action": "add",
    "status": 1
  },
  {
    "name": "view offer images",
    "controller": "offerImages",
    "action": "view",
    "status": 1
  },
  {
    "name": "update offer images",
    "controller": "offerImages",
    "action": "update",
    "status": 1
  },
  {
    "name": "add offers reservations",
    "controller": "offersReservations",
    "action": "add",
    "status": 1
  },
  {
    "name": "view offers reservations",
    "controller": "offersReservations",
    "action": "view",
    "status": 1
  },
  {
    "name": "update offers reservations",
    "controller": "offersReservations",
    "action": "update",
    "status": 1
  },
  {
    "name": "add categories",
    "controller": "categories",
    "action": "add",
    "status": 1
  },
  {
    "name": "view categories",
    "controller": "categories",
    "action": "view",
    "status": 1
  },
  {
    "name": "update categories",
    "controller": "categories",
    "action": "update",
    "status": 1
  },
  {
    "name": "add settings",
    "controller": "settings",
    "action": "add",
    "status": 1
  },
  {
    "name": "view settings",
    "controller": "settings",
    "action": "view",
    "status": 1
  },
  {
    "name": "update settings",
    "controller": "settings",
    "action": "update",
    "status": 1
  },
  {
    "name": "add template messages",
    "controller": "templateMessages",
    "action": "add",
    "status": 1
  },
  {
    "name": "view template messages",
    "controller": "templateMessages",
    "action": "view",
    "status": 1
  },
  {
    "name": "update template messages",
    "controller": "templateMessages",
    "action": "update",
    "status": 1
  },
  {
    "name": "add web-view",
    "controller": "webView",
    "action": "add",
    "status": 1
  },
  {
    "name": "view web-view",
    "controller": "webView",
    "action": "view",
    "status": 1
  },
  {
    "name": "update web-view",
    "controller": "webView",
    "action": "update",
    "status": 1
  },
  {
    "name": "add notification",
    "controller": "notification",
    "action": "add",
    "status": 1
  },
  {
    "name": "view notification",
    "controller": "notification",
    "action": "view",
    "status": 1
  },
  {
    "name": "update notification",
    "controller": "notification",
    "action": "update",
    "status": 1
  },
  {
    "name": "add permission",
    "controller": "permission",
    "action": "add",
    "status": 1
  },
  {
    "name": "view permission",
    "controller": "permission",
    "action": "view",
    "status": 1
  },
  {
    "name": "update permission",
    "controller": "permission",
    "action": "update",
    "status": 1
  },
  {
    "name": "add role",
    "controller": "role",
    "action": "add",
    "status": 1
  },
  {
    "name": "view role",
    "controller": "role",
    "action": "view",
    "status": 1
  },
  {
    "name": "update role",
    "controller": "role",
    "action": "update",
    "status": 1
  },
  {
    "name": "add role access",
    "controller": "roleAccess",
    "action": "add",
    "status": 1
  },
  {
    "name": "view role access",
    "controller": "roleAccess",
    "action": "view",
    "status": 1
  },
  {
    "name": "update role access",
    "controller": "roleAccess",
    "action": "update",
    "status": 1
  }
]

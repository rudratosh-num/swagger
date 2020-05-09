const Router = require ('express')
const { checkUser } = require('../utils/tokenMiddleware')
const {
  addAbout, addCountry, addCity, addContact,
  addWeekDay, addRegion, addCategory, addSetting,
  addWebView, addTemplateMessages, addNotification,

  findAbout, findCountry, findCity, findContact,
  findWeekDays, findRegion, findCategories, findSettings,
  findWebView, findTemplateMessages, findNotification,

  updateAbout, updateCountry, updateCity, updateContact,
  updateWeekDay, updateRegion, updateCategory, updateSetting,
  updateWebView, updateTemplateMessages, updateNotification
} = require('../models/commonModel')
const moment = require('moment')
const { baseUrl } = require('../exportGlobal')
const { HasRole } = require('../utils/permissionMiddleware')
const {
  about, countries, cities,
  contact, weekDays, regions,
  categories, settings,
  templateMessages, webView,
  notification
} = require('../utils/collections')
const {
  aboutYaml, countriesYaml,
  citiesYaml, contactYaml,
  weekDaysYaml, regionYaml,
  categoriesYaml, settingYaml,
  templateMessagesYaml, webViewYaml,
  notificationYaml
} = require('../schemas/validator')

const commonRouterLogged = Router()

commonRouterLogged.post('/about/add', HasRole(about, 'add'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/about/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        const payload = JSON.parse(req.body.payload)
        await addAbout({ ...payload, image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.insertedCount){
            res.status(201).json({ status: true, message: "about added"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

commonRouterLogged.post('/about/search/:skip', async (req, res)=>{
  await findAbout({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/about/update/{id}:
 *    put:
 *      summary: Use to update about by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: about id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/About'
 *      responses:
 *        "201":
 *          description: about response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AboutUpdateResponse'
 */
commonRouterLogged.put('/about/update/:id', HasRole(about, 'update'), async (req, res)=>{
  await updateAbout(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "about updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/about/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable about by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: about id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: about response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AboutDeleteResponse'
 */
commonRouterLogged.put('/about/delete/:id', HasRole(about, 'update'), async (req, res)=>{
  await updateAbout(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "about deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

commonRouterLogged.put('/about/upload-image/:id', HasRole(about, 'update'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/about/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        const payload = JSON.parse(req.body.payload)
        await updateAbout(req.params.id, { ...payload, image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.modifiedCount){
            res.status(201).json({ status: true, message: "image uploaded"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

commonRouterLogged.post('/country/add', HasRole(countries, 'add'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/country/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        const payload = JSON.parse(req.body.payload)
        await addCountry({ ...payload, image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.insertedCount){
            res.status(201).json({ status: true, message: "country added"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

commonRouterLogged.post('/country/search/:skip', async (req, res)=>{
  await findCountry({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/country/update/{id}:
 *    put:
 *      summary: Use to update country by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: country id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Country'
 *      responses:
 *        "201":
 *          description: about response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CountryUpdateResponse'
 */
commonRouterLogged.put('/country/update/:id', HasRole(countries, 'update'), async (req, res)=>{
  await updateCountry(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "country updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/country/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable country by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: country id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: country response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CountryDeleteResponse'
 */
commonRouterLogged.put('/country/delete/:id', HasRole(countries, 'update'), async (req, res)=>{
  await updateCountry(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "country deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

commonRouterLogged.put('/country/upload-image/:id', HasRole(countries, 'update'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/country/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        const payload = JSON.parse(req.body.payload)
        await updateCountry(req.params.id, { ...payload, image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.modifiedCount){
            res.status(201).json({ status: true, message: "image uploaded"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

/**
 * @swagger
 * path:
 *  /logged/common/city/add:
 *    post:
 *      summary: Use to add city
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/City'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CityResponse'
 */
commonRouterLogged.post('/city/add', HasRole(cities, 'add'), async (req, res)=>{
  await addCity({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "city added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/city/search/{skip}:
 *    post:
 *      summary: Use to list or search city
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/City'
 *      responses:
 *        "200":
 *          description: city search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/City'
 */
commonRouterLogged.post('/city/search/:skip', async (req, res)=>{
  await findCity({ ...req.body }, req.params.skip, (result)=>{
    res.status(400).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/city/update/{id}:
 *    put:
 *      summary: Use to update city by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: city id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/City'
 *      responses:
 *        "201":
 *          description: city response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CityUpdateResponse'
 */
commonRouterLogged.put('/city/update/:id', HasRole(cities, 'update'), async (req, res)=>{
  await updateCity(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "city updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/city/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable city by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: city id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: city response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CityDeleteResponse'
 */
commonRouterLogged.put('/city/delete/:id', HasRole(cities, 'update'), async (req, res)=>{
  await updateCity(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "city deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/contact/add:
 *    post:
 *      summary: Use to add contact
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactResponse'
 */
commonRouterLogged.post('/contact/add', HasRole(contact, 'add'), async (req, res)=>{
  await addContact({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "contact added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/contact/search/{skip}:
 *    post:
 *      summary: Use to list or search contact
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      responses:
 *        "200":
 *          description: contact search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Contact'
 */
commonRouterLogged.post('/contact/search/:skip', async (req, res)=>{
  await findContact({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/contact/update/{id}:
 *    put:
 *      summary: Use to update contact by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: contact id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Contact'
 *      responses:
 *        "201":
 *          description: contact response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactUpdateResponse'
 */
commonRouterLogged.put('/contact/update/:id', HasRole(contact, 'update'), async (req, res)=>{
  await updateContact(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/contact/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable contact by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: contact id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: contact response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactDeleteResponse'
 */
commonRouterLogged.put('/contact/delete/:id', HasRole(contact, 'update'), async (req, res)=>{
  await updateContact(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/day/add:
 *    post:
 *      summary: Use to add day
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WeekDay'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WeekDayResponse'
 */
commonRouterLogged.post('/day/add', HasRole(weekDays, 'add'), async (req, res)=>{
  await addWeekDay({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "week day added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/day/search/{skip}:
 *    post:
 *      summary: Use to list or search weekday
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WeekDay'
 *      responses:
 *        "200":
 *          description: weekday search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WeekDay'
 */
commonRouterLogged.post('/day/search/:skip', async (req, res)=>{
  await findWeekDays({ ...req.body }, req.params.skip, (result)=>{
    res.status(400).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/day/update/{id}:
 *    put:
 *      summary: Use to update week day by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: week day id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WeekDay'
 *      responses:
 *        "201":
 *          description: week day response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DayUpdateResponse'
 */
commonRouterLogged.put('/day/update/:id', HasRole(weekDays, 'update'), async (req, res)=>{
  await updateWeekDay(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact us updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/day/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable day by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: day id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: day response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DayDeleteResponse'
 */
commonRouterLogged.put('/day/delete/:id', HasRole(weekDays, 'update'), async (req, res)=>{
  await updateWeekDay(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "contact us updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/region/add:
 *    post:
 *      summary: Use to add region
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Region'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RegionResponse'
 */
commonRouterLogged.post('/region/add', HasRole(regions, 'add'), async (req, res)=>{
  await addRegion({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "region added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/region/search/{skip}:
 *    post:
 *      summary: Use to list or search region
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Region'
 *      responses:
 *        "200":
 *          description: region search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Region'
 */
commonRouterLogged.post('/region/search/:skip', async (req, res)=>{
  await findRegion({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/region/update/{id}:
 *    put:
 *      summary: Use to update region by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: region id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Region'
 *      responses:
 *        "201":
 *          description: region response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RegionUpdateResponse'
 */
commonRouterLogged.put('/region/update/:id', HasRole(regions, 'update'), async (req, res)=>{
  await updateRegion(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "about updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/region/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable region by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: region id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: region response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RegionDeleteResponse'
 */
commonRouterLogged.put('/region/delete/:id', HasRole(regions, 'update'), async (req, res)=>{
  await updateRegion(req.params.id, { delete: false }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "about updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

commonRouterLogged.post('/category/add', HasRole(categories, 'add'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/category/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        const payload = JSON.parse(req.body.payload)
        await addCategory({ ...payload, image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.insertedCount){
            res.status(201).json({ status: true, message: "category added"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
    })
  }
})

commonRouterLogged.post('/category/search/:skip', async (req, res)=>{
  await findCategories({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/category/update/{id}:
 *    put:
 *      summary: Use to update category by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: category id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      responses:
 *        "201":
 *          description: category response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryUpdateResponse'
 */
commonRouterLogged.put('/category/update/:id', HasRole(categories, 'update'), async (req, res)=>{
  await updateCategory(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "category updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

commonRouterLogged.put('/category/upload-image/:id', HasRole(categories, 'update'), async (req, res)=>{
  if(req.files && req.files.image){
    const { name } = req.files.image
    const imageUrl = `/images/category/${ moment().format("DD-MM-YYYY-hh-mm-ss") }-${ name }`
    req.files.image.mv(`${ baseUrl }/${ imageUrl }`, async function(err) {
      if (err){
        return res.status(400).json({
          status: false,
          message: 'image upload error',
          err: err
        })
      }else{
        await updateCategory(req.params.id, { image: imageUrl }, checkUser(req), (result)=>{
          if(result && result.modifiedCount){
            res.status(201).json({ status: true, message: "image uploaded"})
          }else{
            res.status(400).json(result)
          }
        })
      }
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'no image found',
      err: err
    })
  }
})

/**
 * @swagger
 * path:
 *  /logged/common/category/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable category by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: category id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: category response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryDeleteResponse'
 */
commonRouterLogged.put('/category/delete/:id', HasRole(categories, 'update'), async (req, res)=>{
  await updateCategory(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "category deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/setting/add:
 *    post:
 *      summary: Use to add setting
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Setting'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SettingResponse'
 */
commonRouterLogged.post('/setting/add', HasRole(settings, 'add'), async (req, res)=>{
  await addSetting({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "setting added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/setting/search/{skip}:
 *    post:
 *      summary: Use to list or search setting
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Setting'
 *      responses:
 *        "200":
 *          description: setting search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Setting'
 */
commonRouterLogged.post('/setting/search/:skip', async (req, res)=>{
  await findSettings({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/setting/update/{id}:
 *    put:
 *      summary: Use to update setting by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: setting id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Setting'
 *      responses:
 *        "201":
 *          description: setting response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SettingUpdateResponse'
 */
commonRouterLogged.put('/setting/update/:id', HasRole(settings, 'update'), async (req, res)=>{
  await updateSetting(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "setting updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/setting/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable setting by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: setting id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: setting response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SettingDeleteResponse'
 */
commonRouterLogged.put('/setting/delete/:id', HasRole(settings, 'update'), async (req, res)=>{
  await updateSetting(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "setting deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/template/add:
 *    post:
 *      summary: Use to add template message
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TemplateMessages'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TemplateMessagesResponse'
 */
commonRouterLogged.post('/template/add', HasRole(templateMessages, 'add'), async (req, res)=>{
  await addTemplateMessages({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "template message added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/template/search/{skip}:
 *    post:
 *      summary: Use to list or search template message
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TemplateMessages'
 *      responses:
 *        "200":
 *          description: template message search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TemplateMessages'
 */
commonRouterLogged.post('/template/search/:skip', async (req, res)=>{
  await findTemplateMessages({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/template/update/{id}:
 *    put:
 *      summary: Use to update template message by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: template message id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TemplateMessages'
 *      responses:
 *        "201":
 *          description: template message response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TemplateUpdateResponse'
 */
commonRouterLogged.put('/template/update/:id', HasRole(templateMessages, 'update'), async (req, res)=>{
  await updateTemplateMessages(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "template message updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/template/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable template by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: template id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: template response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TemplateDeleteResponse'
 */
commonRouterLogged.put('/template/delete/:id', HasRole(templateMessages, 'update'), async (req, res)=>{
  await updateTemplateMessages(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "template message deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/web-view/add:
 *    post:
 *      summary: Use to add web-view
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WebView'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WebViewResponse'
 */
commonRouterLogged.post('/web-view/add', HasRole(webView, 'add'), async (req, res)=>{
  await addWebView({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "web view added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/web-view/search/{skip}:
 *    post:
 *      summary: Use to list or search web-view
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WebView'
 *      responses:
 *        "200":
 *          description: web-view search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WebView'
 */
commonRouterLogged.post('/web-view/search/:skip', async (req, res)=>{
  await findWebView({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/web-view/update/{id}:
 *    put:
 *      summary: Use to update web-view by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: web-view id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WebView'
 *      responses:
 *        "201":
 *          description: web-view response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WebViewUpdateResponse'
 */
commonRouterLogged.put('/web-view/update/:id', HasRole(webView, 'update'), async (req, res)=>{
  await updateWebView(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "web view updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/web-view/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable web-view by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: web-view id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: web-view response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/WebViewDeleteResponse'
 */
commonRouterLogged.put('/web-view/delete/:id', HasRole(webView, 'update'), async (req, res)=>{
  await updateWebView(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "web view deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/notification/add:
 *    post:
 *      summary: Use to add notification
 *      tags: [Common]
 *      parameters:
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      responses:
 *        "201":
 *          description: response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NotificationResponse'
 */
commonRouterLogged.post('/notification/add', HasRole(notification, 'add'), async (req, res)=>{
  await addNotification({ ...req.body }, checkUser(req), (result)=>{
    if(result && result.insertedCount){
      res.status(201).json({ status: true, message: "notification added"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/notification/search/{skip}:
 *    post:
 *      summary: Use to list or search notification
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: skip
 *          schema:
 *            type: string
 *          required: true
 *          description: skip as offset
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      responses:
 *        "200":
 *          description: notification search response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 */
commonRouterLogged.post('/notification/search/:skip', async (req, res)=>{
  await findNotification({ ...req.body }, req.params.skip, (result)=>{
    res.status(200).json(result)
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/notification/update/{id}:
 *    put:
 *      summary: Use to update notification by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: notification id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      requestBody:
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notification'
 *      responses:
 *        "201":
 *          description: notification response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NotificationUpdateResponse'
 */
commonRouterLogged.put('/notification/update/:id', HasRole(notification, 'update'), async (req, res)=>{
  await updateNotification(req.params.id, { ...req.body }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "notification updated"})
    }else{
      res.status(400).json(result)
    }
  })
})

/**
 * @swagger
 * path:
 *  /logged/common/notification/delete/{id}:
 *    put:
 *      summary: Use to delete/ disable notification by id
 *      tags: [Common]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: notification id
 *        - in: header
 *          name: Auth
 *          schema:
 *            type: string
 *          required: true
 *          description: Bearer Token
 *      responses:
 *        "201":
 *          description: notification response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NotificationDeleteResponse'
 */
commonRouterLogged.put('/notification/delete/:id', HasRole(notification, 'update'), async (req, res)=>{
  await updateNotification(req.params.id, { delete: true }, checkUser(req), (result)=>{
    if(result && result.modifiedCount){
      res.status(201).json({ status: true, message: "notification deleted"})
    }else{
      res.status(400).json(result)
    }
  })
})

module.exports = {
  commonRouterLogged: commonRouterLogged
}

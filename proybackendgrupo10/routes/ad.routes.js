const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const adValidation = require('../middlewares/adValidation')
const AdService = require('./../services/ad.service')
const UserService = require('./../services/user.service')
const checkOwnership = require('../middlewares/checkOwnership')

function ad(app) {
  const router = express.Router()
  app.use('/api/ads', router)
  const adServ = new AdService()
  const userServ = new UserService()

  // router.get('/', async (req, res) => {
  //   const id = '62ba6ba2b9c4dd4d6627e58f'
  //   // const { id } = req.user
  //   const result = await adServ.getAdsByEditorId(id)
  //   return res.json(result)
  // })

  router.get('/', authValidation, async (req, res) => {
    const { id } = req.user
    const result = await adServ.getAdsByEditorId(id)
    return res.json(result)
  })

  // router.get('/', authValidation, async (req, res) => {
  //   const { id } = req.user
  //   const result = await adServ.getAdsByEditorId(id)
  //   return res.json(result)
  // })

  // router.get('/all', async (req, res) => {
  //   // const { id } = req.user
  //   const id = '62ba6ba2b9c4dd4d6627e58f'

  //   const user = await userServ.getOne(id)

  //   const { infoAreas } = user

  //   console.log(infoAreas)
  //   const result = await adServ.getAll(infoAreas)

  //   return res.json({ result })
  // })

  router.get('/all', authValidation, async (req, res) => {
    const { id } = req.user

    const user = await userServ.getOne(id)
    const { infoAreas } = user

    const result = await adServ.getAll(infoAreas)

    return res.json({ result })
  })
  router.get('/allall', async (req, res) => {
    const ads = await adServ.getAllAll()
    return res.json(ads)
  })

  router.get('/all-to-encargado', authValidation, async (req, res) => {
    try {
      const { id } = req.user
      console.log(id)

      const user = await userServ.getOne(id)
      const { infoAreas } = user

      const result = await adServ.getAdsWhereUserIsEncargado()

      const areasWhereUserIsEncargado = []
      let isIncluded = true
      let isIncluded2 = true

      infoAreas.forEach((el) => {
        isIncluded = el.userRoles.includes('Encargado')
        if (isIncluded) {
          areasWhereUserIsEncargado.push(el)
        }
      })

      const areasId = []

      areasWhereUserIsEncargado.forEach((el) => {
        areasId.push(el.area._id.toString())
      })

      const positionsToDelete = []
      for (let j = 0; j < result.length; j++) {
        for (let index = 0; index < result[j].receivers.length; index++) {
          isIncluded2 = areasId.includes(
            result[j].receivers[index].area.toString()
          )

          if (!isIncluded2) {
            result[j].receivers.splice(index, 1)
          }
          if (result[j].receivers.length === 0) {
            positionsToDelete.push(j)
          }
        }
      }

      for (let index = 0; index < positionsToDelete.length; index++) {
        result.splice(positionsToDelete[index], 1)
      }

      return res.json({
        success: true,
        result,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      })
    }
  })

  // router.post('/', authValidation, adValidation, async (req, res) => {
  //   const { id } = req.user
  //   const { body } = req
  //   const data = {
  //     ...body,
  //     editor: id
  //   }
  //   const result = await adServ.create(data)
  //   return res.status(201).json(result)
  // })

  router.post('/', authValidation, async (req, res) => {
    try {
      const { id } = req.user
      const { body } = req
      const data = {
        ...body,
        editor: id,
      }
      const result = await adServ.create(data)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong',
      })
    }
  })

  router.put('/:id', authValidation, checkOwnership, async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await adServ.update(id, body)
    return res.json(result)
  })

  router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await adServ.update(id, body)
    return res.json(result)
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await adServ.delete(id)
    return res.json(result)
  })
}

module.exports = ad

const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const adValidation = require('../middlewares/adValidation')
const AdService = require('./../services/ad.service')
const UserService = require('./../services/user.service')
const checkOwnership = require('../middlewares/checkOwnership')

function ad (app) {
  const router = express.Router()
  app.use('/api/ads', router)
  const adServ = new AdService()
  const userServ = new UserService()

  router.get('/', async (req, res) => {
    const id = '62ba6ba2b9c4dd4d6627e58f'
    // const { id } = req.user
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

  router.post('/', async (req, res) => {
    const id = '62ba6ba2b9c4dd4d6627e58f'
    const { body } = req
    const data = {
      ...body,
      editor: id
    }
    const result = await adServ.create(data)
    return res.status(201).json(result)
  })

  router.put('/:id', authValidation, checkOwnership, async (req, res) => {
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

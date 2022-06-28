const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const adValidation = require('../middlewares/adValidation')
const AdService = require('./../services/ad.service')
const checkOwnership = require('../middlewares/checkOwnership')

function ad (app) {
  const router = express.Router()
  app.use('/api/ads', router)
  const adServ = new AdService()

  router.get('/', authValidation, async (req, res) => {
    const { id } = req.user
    const result = await adServ.getAdsByEditorId(id)
    return res.json(result)
  })

  router.get('/all', async (req, res) => {

  })

  router.post('/', authValidation, adValidation, async (req, res) => {
    const { id } = req.user
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

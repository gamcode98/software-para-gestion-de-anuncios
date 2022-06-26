const express = require('express')
const AdService = require('./../services/ad.service')

function ad (app) {
  const router = express.Router()
  app.use('/api/advertisements', router)
  const adServ = new AdService()

  router.get('/', async (req, res) => {
    const result = await adServ.getAll()
    return res.json(result)
  })

  router.post('/', async (req, res) => {
    const body = req.body
    const result = await adServ.create(body)
    return res.json(result)
  })
  router.put('/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body
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

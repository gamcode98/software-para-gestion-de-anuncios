const express = require('express')
const AreaService = require('../services/area.service')

function area (app) {
  const router = express.Router()

  app.use('/api/areas', router)
  const areaServ = new AreaService()

  router.get('/', async (req, res) => {
    const areas = await areaServ.getAll()
    return res.json(areas)
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const area = await areaServ.create(body)
    return res.json(area)
  })
}

module.exports = area

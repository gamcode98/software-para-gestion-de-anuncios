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

  router.get('/:id', async (req, res) => {
    const { id } = req.params
    const area = await areaServ.findOne(id)
    return res.json(area)
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const area = await areaServ.create(body)
    return res.json(area)
  })

  router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await areaServ.update(id, body)
    return res.json(result)
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await areaServ.delete(id)
    return res.json(result)
  })
}

module.exports = area

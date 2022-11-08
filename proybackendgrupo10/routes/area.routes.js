const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const AreaService = require('../services/area.service')
const UserService = require('../services/user.service')

function area (app) {
  const router = express.Router()

  app.use('/api/areas', router)
  const areaServ = new AreaService()
  const userServ = new UserService()

  router.get('/', async (req, res) => {
    try {
      const areas = await areaServ.getAll()
      return res.json(areas)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong'
      })
    }
  })

  router.get('/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params
      const area = await areaServ.findOne(id)
      return res.json(area)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong'
      })
    }
  })

  router.post('/', authValidation, async (req, res) => {
    try {
      const { body } = req
      const area = await areaServ.create(body)
      return res.json(area)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong'
      })
    }
  })

  router.put('/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params
      const { body } = req
      const result = await areaServ.update(id, body)
      return res.json(result)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong'
      })
    }
  })

  router.delete('/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params
      console.log(id)
      const users = await userServ.getAll()
      const areasId = []

      for (let index = 0; index < users.length; index++) {
        for (let j = 0; j < users[index].infoAreas.length; j++) {
          areasId.push(users[index].infoAreas[j].area._id.toString())
        }
      }

      for (let index = 0; index < areasId.length; index++) {
        if (areasId[index] === id) {
          return res.status(403).json({
            error: true,
            message: 'Insufficient permissions'
          })
        }
      }

      const result = await areaServ.delete(id)
      return res.json(result)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something were wrong'
      })
    }
  })
}

module.exports = area

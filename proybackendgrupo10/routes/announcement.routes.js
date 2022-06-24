const express = require('express')
const AnnouncementService = require('./../services/announcement.service')

function announcement (app) {
  const router = express.Router()
  app.use('/api/advertisements', router)
  const announcementServ = new AnnouncementService()

  router.get('/', async (req, res) => {
    const result = await announcementServ.getAll()
    return res.json(result)
  })

  router.post('/', async (req, res) => {
    const body = req.body
    const result = await announcementServ.create(body)
    return res.json(result)
  })
}

module.exports = announcement
const express = require('express')
const UserService = require('../services/user.service')

function user (app) {
  const router = express.Router()

  app.use('/api/users', router)
  const userServ = new UserService()

  router.get('/', async (req, res) => {
    const users = await userServ.getAll()
    return res.json(users)
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const user = await userServ.create(body)
    return res.json(user)
  })
}

module.exports = user

const express = require('express')
const PersonService = require('../services/person.service')

function person (app) {
  const router = express.Router()

  app.use('/api/persons', router)
  const personServ = new PersonService()

  router.get('/', async (req, res) => {
    const persons = await personServ.getAll()
    return res.json(persons)
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const person = await personServ.create(body)
    return res.json(person)
  })
}

module.exports = person

const nodemailer = require('nodemailer')
const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const UserService = require('../services/user.service')

function user (app) {
  const router = express.Router()

  app.use('/api/users', router)
  const userServ = new UserService()

  router.get('/', async (req, res) => {
    const users = await userServ.getAll()
    return res.json(users)
  })

  router.get('/request-enter-area', authValidation, async (req, res) => {
    try {
      const { id } = req.user
      const user = await userServ.getOne(id)
      const users = await userServ.getAll()
      const { infoAreas } = user
      const areasWhereUserIsEncargado = []
      let isIncluded = true
      let isIncluded2 = true

      infoAreas.forEach(el => {
        isIncluded = el.userRoles.includes('Encargado')
        if (isIncluded) {
          areasWhereUserIsEncargado.push(el)
        }
      })

      const areasId = []

      areasWhereUserIsEncargado.forEach(el => {
        areasId.push(el.area._id.toString())
      })
      const positionsToDelete = []

      for (let j = 0; j < users.length; j++) {
        for (let index = 0; index < users[j].infoAreas.length; index++) {
          console.log(users[j].infoAreas[index].area._id.toString())
          isIncluded2 = areasId.includes(users[j].infoAreas[index].area._id.toString())
          console.log('isIncluded2', isIncluded2)
          if (!isIncluded2) {
            users[j].infoAreas.splice(index, 1)
          }
          if (users[j].infoAreas.length === 0) {
            positionsToDelete.push(j)
          }
        }
      }

      for (let index = 0; index < positionsToDelete.length; index++) {
        users.splice(positionsToDelete[index], 1)
      }

      // console.log(areasWhereUserIsEncargado)
      // console.log(areasId)

      return res.json(users)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong'
      })
    }
  })

  router.get('/my-info', authValidation, async (req, res) => {
    const { id } = req.user
    const user = await userServ.getOne(id)
    return res.json(user)
  })

  router.get('/:id', authValidation, async (req, res) => {
    const { id } = req.params
    const user = await userServ.getOne(id)
    return res.json(user)
  })

  router.post('/', async (req, res) => {
    const { body } = req
    const user = await userServ.create(body)
    return res.json(user)
  })

  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const user = await userServ.delete(id, body)
    return res.json(user)
  })

  router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const user = await userServ.update(id, body)
    return res.json(user)
  })
  router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const user = await userServ.updatePartial(id, body)
    return res.json(user)
  })
  router.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sebasr432@gmail.com',
        pass: 'opfuhkodhbcszosp'
      }
    })
    const mailOptions = {
      from: '"Fred Foo 👻" <superadmin@gmail.com>', // sender address
      to: 'tomiir432@gmail.com,', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?' // plain text body
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message)
      } else {
        console.log('email enviado')
        res.status(200).jsonp(req.body)
      }
    })
  })
}

module.exports = user

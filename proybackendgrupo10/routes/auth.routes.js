const express = require('express')
const AuthService = require('../services/auth.service')
const nodemailer = require('nodemailer')
const AreaService = require('../services/area.service')
const UserService = require('../services/user.service')
const { nodemailerSecret, emailToNodemailer } = require('../config')

const auth = (app) => {
  const router = express.Router()
  const authServ = new AuthService()
  const areaServ = new AreaService()
  const userServ = new UserService()
  app.use('/api/auth', router)

  router.post('/login', async (req, res) => {
    try {
      const result = await authServ.login(req.body)
      return res.status(result.error ? 400 : 200).json(result)
    } catch (error) {
      console.log(error)
    }
  })

  router.post('/signup', async (req, res) => {
    const { body } = req
    const { infoAreas } = body
    const result = await authServ.signup(body)
    const infoAreasToSend = []
    const users = await userServ.getAll()
    const areasId = []
    const adminEmails = []
    let isIncluded2 = true

    infoAreas.forEach((el) => {
      areasId.push(el.area._id)
    })

    for (let j = 0; j < users.length; j++) {
      for (let index = 0; index < users[j].infoAreas.length; index++) {
        isIncluded2 = areasId.includes(
          users[j].infoAreas[index].area._id.toString()
        )
        if (isIncluded2 === false) {
          users[j].infoAreas.splice(index, 1)
          index = -1
        } else {
          isIncluded2 = true
        }
      }

      if (users[j].infoAreas.length === 0) {
        users.splice(j, 1)
        j = 0
      }
    }

    let index = 0

    while (index < users.length) {
      let i = 0
      while (i < users[index].infoAreas.length) {
        let aux = false
        if (
          users[index].infoAreas[i].status !== 'aceptado'
        ) {
          users[index].infoAreas.splice(i, 1)
          aux = true
        }
        i++
        if (aux) {
          i = 0
        }
      }

      if (users[index].infoAreas.length === 0) {
        users.splice(index, 1)
        index = 0
      } else {
        index++
      }
    }

    users.forEach((user) => {
      adminEmails.push(user.email)
    })

    for (let index = 0; index < infoAreas.length; index++) {
      const area = await areaServ.findOne(infoAreas[index].area)
      const { name } = area
      infoAreas[index].area = name
      infoAreasToSend.push(
        `Area: ${infoAreas[index].area} con el/los rol/es: ${infoAreas[index].userRoles}`
      )
      infoAreasToSend.push('<br>')
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailToNodemailer,
        pass: nodemailerSecret
      }
    })

    const mailOptions = {
      from: '"Fred Foo 👻" <sitemaanuncios@gmail.com>',
      to: `${adminEmails.join(', ')}`, // admins del area
      subject: 'Solicitud de ingreso al/as area/s',
      html: `
            <p>El usuario: ${body.firstName} ${body.lastName} a solicitado el ingreso al area.</p>
            <p>Ingresa al sistema para tomar acciones</p>                        
            <a href="https://localhost:4200/api/auth/login">Link de acceso al sistema</a>
            `
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message)
      } else {
        console.log('email enviado')
        return res.status(result.error ? 400 : 200).json(result)
      }
    })
  })
}

module.exports = auth

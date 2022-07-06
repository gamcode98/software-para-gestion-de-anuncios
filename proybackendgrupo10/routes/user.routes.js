const express = require('express')
const { authValidation } = require('../middlewares/authValidation')
const UserService = require('../services/user.service')

function user (app) {
  const router = express.Router()

  app.use('/api/users', router)
  const userServ = new UserService()

  router.get('/', async (req, res) => {
    try {
      const users = await userServ.getAll()
      return res.json(users)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong'
      })
    }
  })

  router.get('/request-enter-area', authValidation, async (req, res) => {
    try {
      const { id } = req.user
      const user = await userServ.getOne(id)
      const users = await userServ.getAll()
      const { infoAreas } = user
      const areasWhereUserIsEncargado = []
      let isIncluded = true

      for (let index = 0; index < users.length; index++) {
        if (users[index]._id.toString() === id) {
          users.splice(index, 1)
          break
        }
      }

      infoAreas.forEach((infoArea) => {
        isIncluded =
          infoArea.userRoles.includes('Encargado') &&
          infoArea.status === 'aceptado'
        if (isIncluded) areasWhereUserIsEncargado.push(infoArea)
      })

      const areasId = []

      areasWhereUserIsEncargado.forEach((el) =>
        areasId.push(el.area._id.toString())
      )

      // console.log(areasId)

      let isIncluded2 = true

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
      // console.log(users[1].infoAreas);
      let index = 0
      while (index < users.length) {
        let i = 0
        while (i < users[index].infoAreas.length) {
          let aux = false
          if (users[index].infoAreas[i].status !== 'pendiente') {
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

      // for (let index = 0; index < users.length; index++) {
      //   //console.log("users[index].infoAreas => ", users[index].infoAreas);
      //   if (users[index].infoAreas !== undefined) {
      //     console.log(index);
      //     for (let j = 0; j < users[index].infoAreas.length; j++) {
      //       // console.log(
      //       //   "users[index].infoAreas[j]=> ",
      //       //   users[index].infoAreas[j]
      //       // );
      //       if (users[index].infoAreas[j].status !== "pendiente") {
      //         users.splice(index, 1);
      //         index = -1;
      //       }
      //     }
      //   }
      // }

      // console.log(users);

      return res.json(users)
    } catch (error) {
      console.log(error)
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

  router.delete('/:id', authValidation, async (req, res) => {
    try {
      const { id } = req.params
      const { body } = req
      const user = await userServ.delete(id, body)
      return res.json(user)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Something went wrong'
      })
    }
  })

  router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    const user = await userServ.update(id, body)
    return res.json(user)
  })

  router.patch('/:id', async (req, res) => {
    const { id } = req.params
    const { infoAreas } = req.body

    const user = await userServ.getOne(id)

    // console.log(infoAreas);

    for (let index = 0; index < infoAreas.length; index++) {
      for (let j = 0; j < user.infoAreas.length; j++) {
        if (
          infoAreas[index].area._id === user.infoAreas[j].area._id.toString()
        ) {
          user.infoAreas[j] = infoAreas[index]
        }
      }
    }

    const userUpdated = await userServ.updatePartial(id, user)
    return res.json(userUpdated)
    // return res.json({ message: 'working' })
  })
}

module.exports = user

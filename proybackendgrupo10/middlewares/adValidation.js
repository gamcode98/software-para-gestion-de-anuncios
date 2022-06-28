const AreaService = require('../services/area.service')
const UserService = require('./../services/user.service')

const adValidation = async (req, res, next) => {
  const areaServ = new AreaService()
  const userServ = new UserService()

  // const { body } = req
  const { id } = req.user

  // *TODO HACER DINAMICO
  const { receivers } = req.body
  console.log('request receivers =>', receivers)

  // const areaId = body.receivers[0].area
  // const areaRolesToAdd = body.receivers[0].areaRoles
  let isIncluded = true

  console.log('user id =>', id)

  const userInfo = await userServ.getOne(id)

  const { infoAreas } = userInfo

  console.log('user infoAreas =>', infoAreas)

  for (let index = 0; index < receivers.length; index++) {
    const result = await areaServ.findOne(receivers[index].area)
    if (!result) {
      return res.status(400).json({
        error: true,
        message: `The area with id ${receivers[index].area} don't exist`
      })
    }
  }
  console.log('+++++++++++++++++++++++++++++++++++++++++++')
  // *TODO revisar esto

  for (let index = 0; index < receivers.length; index++) {
    const areaId = receivers[index].area
    const areaRolesToAdd = receivers[index].areaRoles

    for (let index = 0; index < infoAreas.length; index++) {
      const userAreaId = infoAreas[index].area.toString()
      const userRoles = infoAreas[index].userRoles

      if (areaId === userAreaId) {
        for (let index = 0; index < areaRolesToAdd.length; index++) {
          isIncluded = userRoles.includes(areaRolesToAdd[index])
          if (!isIncluded) break
        }
      }
      if (!isIncluded) break
    }
    if (!isIncluded) break
  }

  if (!isIncluded) {
    return res.status(400).json({
      error: true,
      message: 'Invalid roled was assigned'
    })
  }

  return next()
}

module.exports = adValidation

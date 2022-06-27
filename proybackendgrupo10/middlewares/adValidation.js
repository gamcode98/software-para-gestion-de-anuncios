const AreaService = require('../services/area.service')

const adValidation = async (req, res, next) => {
  const areaServ = new AreaService()

  const { body } = req
  // *TODO HACER DINAMICO
  const areaId = body.receivers[0].area
  const areaRolesToAdd = body.receivers[0].areaRoles
  let isIncluded = true

  const result = await areaServ.findOne(areaId)

  if (!result) {
    return res.status(400).json({
      error: true,
      message: "The area doesn't exists"
    })
  }

  for (let index = 0; index < areaRolesToAdd.length; index++) {
    isIncluded = result.areaRoles.includes(areaRolesToAdd[index])
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

const AdService = require('./../services/ad.service')

const checkOwnership = async (req, res, next) => {
  const adId = req.params
  const { id } = req.user
  const adServ = new AdService()

  const result = await adServ.getOne(adId.id, id)

  if (result) return next()

  return res.status(403).json({
    error: true,
    message: 'Insufficient permissions'
  })
}

module.exports = checkOwnership

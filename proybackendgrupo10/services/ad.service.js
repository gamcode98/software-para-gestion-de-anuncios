const AdModel = require('../models/ad.model')

class Ad {
  async getAllAll () {
    const ads = await AdModel.find().populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })
    return ads
  }

  async getPublic (id) {
    const ads = await AdModel.find({
      'receivers.area': id,
      'receivers.status': 'autorizado'
    }).populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })
    return ads
  }

  async getAdsWhereUserIsEncargado () {
    const ads = await AdModel.find().populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })

    return ads
  }

  async getAll (infoAreas) {
    const adsArray = []
    for (let index = 0; index < infoAreas.length; index++) {
      const ads = await AdModel.find({
        'receivers.area': infoAreas[index].area,
        'receivers.areaRoles': { $in: infoAreas[index].userRoles },
        'receivers.status': 'autorizado'
      })

      for (let i = 0; i < ads.length; i++) {
        let existe = false
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        for (let j = 0; j < adsArray.length; j++) {
          console.log(ads[i]._id, '===', adsArray[j]._id)
          if (ads[i]._id.toString() === adsArray[j]._id.toString()) {
            console.log('ezzzzzzzzzzzzz')
            existe = true
          }
        }
        if (!existe) {
          adsArray.push(ads[i])
        }
      }
    }
    return adsArray
  }

  async getOne (adId, editorId) {
    const ad = await AdModel.findOne({
      _id: adId,
      editor: editorId
    })
    return ad
  }

  async getOneAd (id) {
    const ad = await AdModel.findById(id).populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })
    return ad
  }

  async getAdsByEditorId (id) {
    const ads = await AdModel.find({ editor: id, 'receivers.status': 'edicion' })
      .populate({
        path: 'receivers',
        populate: { path: 'area', select: '-areaRoles' }
      })
      .populate('editor', { firstName: 1, lastName: 1 })
    return ads
  }

  async getAdsByEditorIdToDelete (id) {
    const ads = await AdModel.find({ editor: id })
    return ads
  }

  async create (data) {
    const ad = await AdModel.create(data)
    return {
      created: true,
      ad
    }
  }

  async update (id, data) {
    const ad = await AdModel.findByIdAndUpdate(id, data, {
      new: true
    })
    return {
      updated: true,
      ad
    }
  }

  async delete (id) {
    const ad = await AdModel.findByIdAndDelete(id)
    return {
      deleted: true,
      ad
    }
  }
}
module.exports = Ad

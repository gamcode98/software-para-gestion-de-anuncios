const AdModel = require('../models/ad.model')

class Ad {
  async getAllAll () {
    const ads = await AdModel.find().populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })
    return ads
  }

  async getPublic () {
    const ads = await AdModel.find({
      'receivers.area': '62c2181876e998700343038b',
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
    try {
      const ad = await AdModel.findOne({
        _id: adId,
        editor: editorId
      })
      return ad
    } catch (error) {
      console.log(error)
    }
  }

  async getOneAd (id) {
    const ad = await AdModel.findById(id).populate({
      path: 'receivers',
      populate: { path: 'area', select: '-areaRoles' }
    })
    return ad
  }

  async getAdsByEditorId (id) {
    try {
      const ads = await AdModel.find({ editor: id })
        .populate({
          path: 'receivers',
          populate: { path: 'area', select: '-areaRoles' }
        })
        .populate('editor', { firstName: 1, lastName: 1 })
      return ads
    } catch (error) {
      console.log(error)
    }
  }

  async create (data) {
    try {
      const ad = await AdModel.create(data)
      return {
        created: true,
        ad
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update (id, data) {
    try {
      const ad = await AdModel.findByIdAndUpdate(id, data, {
        new: true
      })
      return {
        updated: true,
        ad
      }
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id) {
    try {
      const ad = await AdModel.findByIdAndDelete(id)
      return {
        deleted: true,
        ad
      }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = Ad

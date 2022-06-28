const AdModel = require('../models/ad.model')

class Ad {
  async getAll () {
    try {
      const ads = await AdModel.find()
        .populate('editor', { firstName: 1, lastName: 1 })
        .populate({ path: 'receivers', populate: { path: 'area', areaRoles: 1 } })
        // .populate({ path: 'receivers', populate: { path: 'area', select: '-areaRoles' } })
      return ads
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (adId, editorId) {
    try {
      const ad = await AdModel.findOne({ _id: adId, editor: editorId })
      return ad
    } catch (error) {
      console.log(error)
    }
  }

  async getAdsByEditorId (id) {
    try {
      const ads = await AdModel.find({ editor: id })
        .populate({ path: 'receivers', populate: { path: 'area', select: '-areaRoles' } })
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

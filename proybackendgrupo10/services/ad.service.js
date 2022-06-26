const AdModel = require('../models/ad.model')

class Ad {
  async getAll () {
    try {
      const ads = await AdModel.find()
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

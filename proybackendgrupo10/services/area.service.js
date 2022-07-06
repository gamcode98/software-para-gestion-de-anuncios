const AreaModel = require('../models/area.model')

class Area {
  async getAll () {
    try {
      const areas = await AreaModel.find()
      return areas
    } catch (error) {
      console.log(error)
    }
  }

  async getPublicArea () {
    const area = await AreaModel.find({ name: 'publica' })
    return area
  }

  async create (data) {
    try {
      const area = await AreaModel.create(data)
      return {
        created: true,
        area
      }
    } catch (error) {
      console.log(error)
    }
  }

  async findOne (id) {
    try {
      const area = await AreaModel.findById(id)
      return area
    } catch (error) {
      console.log(error)
    }
  }

  async update (id, data) {
    try {
      const area = await AreaModel.findByIdAndUpdate(id, data, { new: true })
      return {
        updated: true,
        area
      }
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id) {
    try {
      const area = await AreaModel.findByIdAndDelete(id)
      return {
        deleted: true,
        area
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Area

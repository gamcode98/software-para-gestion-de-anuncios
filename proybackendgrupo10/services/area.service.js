const AreaModel = require('../models/area.model')

class Area {
  async getAll () {
    const areas = await AreaModel.find()
    return areas
  }

  async getPublicArea () {
    const area = await AreaModel.find({ name: 'publica' })
    return area
  }

  async create (data) {
    const area = await AreaModel.create(data)
    return {
      created: true,
      area
    }
  }

  async findOne (id) {
    const area = await AreaModel.findById(id)
    return area
  }

  async update (id, data) {
    const area = await AreaModel.findByIdAndUpdate(id, data, { new: true })
    return {
      updated: true,
      area
    }
  }

  async delete (id) {
    const area = await AreaModel.findByIdAndDelete(id)
    return {
      deleted: true,
      area
    }
  }
}

module.exports = Area

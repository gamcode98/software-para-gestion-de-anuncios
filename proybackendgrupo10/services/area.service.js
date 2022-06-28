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
}

module.exports = Area

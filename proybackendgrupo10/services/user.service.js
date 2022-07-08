const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class User {
  async getAll () {
    const user = await UserModel.find()
      .select('-password')
      .populate({ path: 'infoAreas', populate: { path: 'area' } })
    return user
  }

  async getOne (id) {
    const user = await UserModel.findById(id)
      .select('-password')
      .populate({
        path: 'infoAreas',
        populate: { path: 'area', select: '-areaRoles' }
      })
    return user
  }

  async create (data) {
    const user = await UserModel.create(data)
    return user
  }

  async getByEmail (email) {
    const user = await UserModel.findOne({ email }).populate({
      path: 'infoAreas',
      populate: { path: 'area' }
    })
    return user
  }

  async delete (id) {
    const user = await UserModel.findByIdAndDelete(id)
    return {
      deleted: true,
      user
    }
  }

  async update (id, data) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(data.password, salt)
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...data, password: hash },
      { new: true }
    )

    return {
      updated: true,
      user
    }
  }

  async updatePartial (id, data) {
    const user = await UserModel.findByIdAndUpdate(id, data, { new: true })

    return {
      updated: true,
      user
    }
  }
}

module.exports = User

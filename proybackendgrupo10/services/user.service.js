const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class User {
  async getAll () {
    try {
      const user = await UserModel.find()
        .select('-password')
        .populate({ path: 'infoAreas', populate: { path: 'area' } })
      return user
    } catch (error) {
      console.log(error)
    }
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
    try {
      const user = await UserModel.create(data)
      return user
    } catch (error) {
      console.log(error)
    }
  }

  async getByEmail (email) {
    const user = await UserModel.findOne({ email }).populate({
      path: 'infoAreas',
      populate: { path: 'area' }
    })
    return user
  }

  async delete (id) {
    try {
      const user = await UserModel.findByIdAndDelete(id)
      return {
        deleted: true,
        user
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update (id, data) {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  async updatePartial (id, data) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data, { new: true })

      return {
        updated: true,
        user
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = User

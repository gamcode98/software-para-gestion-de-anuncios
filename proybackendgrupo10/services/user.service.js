const UserModel = require('../models/user.model')

class User {
  async getAll () {
    try {
      const user = await UserModel.find()
      return user
    } catch (error) {
      console.log(error)
    }
  }

  async create (data) {
    try {
      const user = await UserModel.create(data)
      return {
        created: true,
        user
      }
    } catch (error) {
      console.log(error)
    }
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

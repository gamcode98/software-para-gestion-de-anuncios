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
}

module.exports = User

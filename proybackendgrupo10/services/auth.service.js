const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserService = require('./user.service')
const { jwtSecret } = require('./../config/index')

class AuthService {
  async signup (data) {
    if (data.password) {
      data.password = await this.#encrypt(data.password)
    }
    const userServ = new UserService()
    const user = await userServ.create(data)

    if (user.error) {
      return user
    }
    return this.#getUserData(user)
  }

  async #encrypt (string) {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(string, salt)

    return hash
  }

  #getUserData (user) {
    const userData = {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role
    }

    const token = this.#createToken(userData)
    return {
      user: userData,
      token
    }
  }

  #createToken (payload) {
    const token = jwt.sign(payload, jwtSecret)
    return token
  }

  async login (data) {
    const { email, password } = data
    const userServ = new UserService()
    const user = await userServ.getByEmail(email)
    if (user && (await this.#compare(password, user.password))) {
      return this.#getUserData(user)
    }

    return {
      error: true,
      message: 'Wrong credentials'
    }
  }

  async #compare (string, hash) {
    return await bcrypt.compare(string, hash)
  }
}

module.exports = AuthService

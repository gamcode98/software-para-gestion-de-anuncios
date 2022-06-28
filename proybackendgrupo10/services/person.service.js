const PersonModel = require('../models/person.model')

class Person {
  async getAll () {
    try {
      const person = await PersonModel.find()
      return person
    } catch (error) {
      console.log(error)
    }
  }

  async create (data) {
    try {
      const person = await PersonModel.create(data)
      return {
        created: true,
        person
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Person

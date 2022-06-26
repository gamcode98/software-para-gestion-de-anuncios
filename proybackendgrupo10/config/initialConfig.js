const dotenv = require('dotenv')
const areas = require('../data/areas')
const superadmin = require('../data/user')
const AreaModel = require('../models/area.model')
const UserModel = require('../models/user.model')
const { connection } = require('./db')

dotenv.config()

connection()

const importAreas = async () => {
  try {
    await AreaModel.deleteMany()
    await AreaModel.insertMany(areas)
    await UserModel.create(superadmin)
    console.log('Data Imported')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const deleteAreas = async () => {
  try {
    await AreaModel.deleteMany()
    console.log('Data destroyed')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

switch (process.argv[2]) {
  case '-d': {
    deleteAreas()
    break
  }
  default: {
    importAreas()
  }
}

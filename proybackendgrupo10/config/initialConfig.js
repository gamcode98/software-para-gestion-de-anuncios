const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const areas = require('../data/areas')
const administrators = require('../data/user')

const AreaModel = require('../models/area.model')
const UserModel = require('../models/user.model')
const { connection } = require('./db')

const newUsers = administrators.map(admin => {
  admin.password = bcrypt.hashSync(admin.password, 10)
  return admin
})

dotenv.config()

connection()

const importConfig = async () => {
  try {
    await AreaModel.insertMany(areas)
    const allAreas = await AreaModel.find()
    if (allAreas) {
      for (let index = 0; index < allAreas.length; index++) {
        newUsers[index].infoAreas.area = allAreas[index]._id
        newUsers[index].infoAreas.userRoles = allAreas[index].areaRoles[0]
      }
    }
    await UserModel.insertMany(newUsers)
    console.log('Data Imported')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const deleteConfig = async () => {
  try {
    await AreaModel.deleteMany()
    await UserModel.deleteMany()
    console.log('Data destroyed')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

switch (process.argv[2]) {
  case '-d': {
    deleteConfig()
    break
  }
  default: {
    importConfig()
  }
}

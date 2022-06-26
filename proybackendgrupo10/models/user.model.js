const { Schema, model } = require('mongoose')
const Area = require('./area.model')

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      require: true
    },
    legajo: {
      type: String,
      require: true
    },
    dni: {
      type: Number,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    infoAreas: [
      {
        area: {
          type: Schema.Types.ObjectId,
          ref: Area
        },
        userRoles: [{ type: String }]
      }
    ]
  },
  {
    versionKey: false
  }
)

module.exports = model('user', UserSchema)

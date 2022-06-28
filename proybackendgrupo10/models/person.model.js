const { Schema, model } = require('mongoose')
const Area = require('./area.model')

const PersonSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  legajo: { type: String, require: true },
  dni: { type: Number, require: true },
  email: { type: String, require: true },
  infoAreas: [
    {
      area: { type: Schema.Types.ObjectId, ref: Area, required: true },
      roles: [{ type: String }]
    }
  ]
})

module.exports = model('Person', PersonSchema)

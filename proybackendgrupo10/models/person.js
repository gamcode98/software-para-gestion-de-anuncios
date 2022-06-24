const { Schema, model } = require('mongoose')

const PersonSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, require: true },
  legajo: { type: String, require: true },
  dni: { type: Number, require: true },
  email: { type: String, require: true },
  infoAreas: [
    {
      area: { type: Schema.Types.ObjectId, ref: 'area', required: true },
      roles: [{ type: String }]
    }
  ]
})

module.exports = model('Person', PersonSchema)
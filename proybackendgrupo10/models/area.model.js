const { mongoose } = require('./../config/db')

const areaSchema = new mongoose.Schema(

  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'No less than 3 characters'],
      maxlength: [20, 'No more than 20 characters'],
      lowercase: true,
      trim: true
    },
    areaRoles: {
      type: [String]
    }
  },
  {
    versionKey: false
  }

)

const AreaModel = mongoose.model('area', areaSchema)

module.exports = AreaModel

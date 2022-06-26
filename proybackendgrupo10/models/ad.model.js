const mongoose = require('mongoose')
const { Schema } = mongoose

const advertisementsSchema = new mongoose.Schema({
  text: {
    required: [true, 'text is required'],
    type: String
  },
  typeOfContent: {
    required: [true, 'Select is required'],
    planeText: Boolean,
    image: Boolean,
    html: Boolean,
    video: Boolean
  },
  publishingMedia: [
    {

      name: String,
      required: [true, 'publishingMedia is required'],
      accounts: [String]
    }
  ],
  entryDate: {
    required: [true, 'entryDate is required'],
    initial: Date,
    final: Date
  },
  state: {
    required: [true, 'State is required'],
    type: String
  },
  receivers: [
    {
      required: [true, 'receivers is required'],
      area: {
        type: Schema.Types.ObjectId,
        ref: 'area'
      },
      roles: [String]
    }
  ],
  resources: {
    required: [true, 'resouces is required'],
    pdf: String,
    images: [String]
  },
  readingTime: {
    required: [true, 'readingTime is required'],
    type: String
  },
  editor: {
    required: [true, 'editor is required'],
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }
})

const AdModel = mongoose.model('ad', advertisementsSchema)
module.exports = AdModel

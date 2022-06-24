const mongoose = require('mongoose')
const { Schema } = mongoose

const announcementSchema = new mongoose.Schema({
  text: {
    type: String
  },
  typeOfContent: {
    planeText: String,
    image: String,
    html: String,
    video: String
  },
  publishingMedia: {
    facebook: Boolean,
    twitter: Boolean,
    youtube: Boolean,
    instagram: Boolean,
    email: Boolean,
    tv: Boolean
  },
  entryDate: {
    initial: Date,
    final: Date
  },
  state: {
    type: String
  },
  receivers: [
    {
      area: {
        type: Schema.Types.ObjectId,
        ref: 'area'
      },
      roles: [String]
    }
  ],
  resources: {
    pdf: String,
    images: [String]
  },
  readingTime: {
    type: String
  },
  editor: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  }
})

const AnnouncementModel = mongoose.model('announcement', announcementSchema)
module.exports = AnnouncementModel

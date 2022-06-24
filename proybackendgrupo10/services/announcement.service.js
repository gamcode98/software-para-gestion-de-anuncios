const validationError = require('../helpers/validationError')
const AnnouncementModel = require('../models/announcement.model')

class Announcement {
  async getAll () {
    try {
      const announcements = await AnnouncementModel.find()
      return announcements
    } catch (error) {
      console.log(error)
    }
  }

  async create (data) {
    try {
      const announcement = await AnnouncementModel.create(data)
      return {
        created: true,
        announcement
      }
    } catch (error) {
      return {
        created: false,
        errors: validationError(error.errors)
      }
    }
  }
}
module.exports = Announcement

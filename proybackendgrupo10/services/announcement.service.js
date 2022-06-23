const validationError = require("../helpers/validationError");
const AnnouncementModel = require("../models/announcement.model");

class Announcement {
  async getAll() {
    const announcements = await AnnouncementModel.find().populate("role", {
      announcement: 0,
    });
    return announcements;
  }

  async create(data) {
    try {
      const announcement = await AnnouncementModel.create(data);
      return {
        created: true,
        announcement,
      };
    } catch (error) {
      return {
        created: false,
        errors: validationError(error.errors),
      };
    }
  }
}
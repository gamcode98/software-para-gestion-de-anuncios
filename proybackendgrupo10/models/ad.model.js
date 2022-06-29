const mongoose = require("mongoose");
const { Schema } = mongoose;

const advertisementsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    typeOfContent: {
      planeText: Boolean,
      image: Boolean,
      html: Boolean,
      video: Boolean,
    },
    publishingMedia: [
      {
        name: String,
        accounts: [String],
      },
    ],
    entryDate: {
      initial: { type: Date },
      final: { type: Date },
    },
    state: {
      type: String,
      default: "confeccionado",
    },
    receivers: [
      {
        area: {
          type: Schema.Types.ObjectId,
          ref: "area",
        },
        areaRoles: [String],
        status: { type: String },
      },
    ],
    resources: {
      pdf: String,
      images: [String],
    },
    readingTime: {
      type: String,
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  }
);

const AdModel = mongoose.model("ad", advertisementsSchema);
module.exports = AdModel;

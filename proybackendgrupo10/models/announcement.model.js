const mongoose = require("mongoose");
const { Schema } = mongoose;

const announcementSchema = new mongoose.Schema({
   text: { 
     type: String 
   },
   typeOfContent: { 
     planeText: String,
     image: String,
     html: String,
     video: String },
   publishingMedia: {
     facebook: Boolean,
     twitter: Boolean,
     youtube: Boolean,
     instagram: Boolean,
     email: Boolean,
     tv: Boolean,
   },
   entryDate: {
     initial : Date,
     final : Date,
   },
   state: {
     type : String,
   },
   receivers: [ 
     { 
     type: Schema.Types.ObjectId,
     ref: "Role"
     },
    ],
   resouces: {
     pdf: String,
     images: [String],
   },
   readingTime: {
     type: String,
   },
   editor: {
     type: Schema.Types.ObjectId,
     ref: "Person",
   }
});
mongoose.models.Role || mongoose.model("Role", RoleSchema);
mongoose.models.Person || mongoose.model("Person", PersonSchema);

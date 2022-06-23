const mongoose = require("mongoose");
const { Schema } = mongoose;

const announcementSchema = new mongoose.Schema({
   text: { type: String },
   typeOfContent: { planeText: String, image: String, html: String, video: String }




});
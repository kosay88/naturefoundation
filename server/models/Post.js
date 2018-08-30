const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  size: {
    type: Number,
    default: 0,
    require: true
  },
  lat: {
    type: Number,
    default: 0,
    require: true
  },
  lng: {
    type: Number,
    default: 0,
    require: true
  },
  imgUrl:{
    type: String,
    require: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("Post", PostSchema);

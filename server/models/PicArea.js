const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PicAreaSchema = new Schema({

  imgUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = PicArea = mongoose.model("PicArea", PicAreaSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  links: [{ type: Schema.Types.ObjectId, ref: "Link" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);

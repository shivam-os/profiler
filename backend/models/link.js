const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  siteName: {
    type: String,
    required: true,
  },
  siteUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Link", LinkSchema);

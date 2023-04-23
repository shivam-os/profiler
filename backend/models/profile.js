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

  links: [
    {
      siteName: {
        type: String,
        required: true,
      },
      siteUrl: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);

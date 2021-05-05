const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  shortcode: {
    type: String,
    required: true,
    default: shortId.generate
  },
  startDate :{
    type: Date,
    required : true
  },
  lastSeenDate:{
    type: Date,
    required : true

  },
  redirectCount: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
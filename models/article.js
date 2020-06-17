var mongoose = require("mongoose")
var Schema = mongoose.Schema
var articleSchema = new Schema({
    title: {type: String, required: true},
    summary: {type: String, required: true},
    link: {type: String, required: true},
    image: {type: String, required: false},
    saved: {type: Boolean, default: false},
    note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
      }]
})
var Article = mongoose.model("Article", articleSchema)

module.exports = Article
const mongoose = require("mongoose");

const blogmodel = new mongoose.Schema({
    title:String,
    image:String,
    content:String,
    author:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Blog", blogmodel);
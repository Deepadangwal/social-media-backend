const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    mobile: {
        type:Number,
        required: true,
        max:9999999999,
    },
    DOB: {
        type:Date,
        required: true
    },
    posts:[String],
    friends:[String],
    pendingRequests:[String]
})
const User = mongoose.model('User',userSchema)
module.exports = User

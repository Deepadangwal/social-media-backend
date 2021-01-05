const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true,
    },
})
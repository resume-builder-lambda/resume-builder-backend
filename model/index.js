const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    google: {
        token: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        }
    },



})

module.exports = {
    User: mongoose.model('User', userSchema)
}

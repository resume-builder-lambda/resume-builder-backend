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
            required: true
        },

        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }

    },

    linkedIn: {

        token: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }

    },

    github: {

        username: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        }

    }

})

module.exports = {
    User: mongoose.model('User', userSchema)
}

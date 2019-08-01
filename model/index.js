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

const jobSchema = new Schema({

    user: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    applied: {
        type: Boolean,
        required: true
    },

    interview: {
        type: Boolean,
        required: true
    },

    offer: {
        type: Boolean,
        required: true
    }

})

module.exports = {
    User: mongoose.model('User', userSchema),
    Jobs: mongoose.model('Jobs', jobSchema)
}

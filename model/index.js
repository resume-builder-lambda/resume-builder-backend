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
        },
        email: {
            type: String,
            required: false
        }
    },
    resumes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Resume'
        }
    ]
})

const resumeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    niche: {
        type: String,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = {
    User: mongoose.model('User', userSchema),
    Resume: mongoose.model('Resume', resumeSchema)
}

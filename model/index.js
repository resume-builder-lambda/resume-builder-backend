const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
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
        required: true
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

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
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const googleSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },

    accesstoken:{
        type: String,
        required:true
    }

})

module.exports = {
    User: mongoose.model('User', userSchema),
    Resume: mongoose.model('Resume', resumeSchema)
}

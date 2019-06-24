const { User, Resume } = require('../model')

module.exports = {

    resumes: async (args, req, res) => {

        if (!req.authorized) {

            throw new Error('Not authorized.')

        }

        try {

            const resumes = await Resume.find()

            return resumes

        } catch (err) {

            throw err

        }

    },

    createResume: async (args, req) => {

        if (!req.authorized) {

            throw new Error('Not authorized.')

        }

        const { title, description, niche } = args.resumeInput

        const resume = new Resume({ title, description, niche, creator: req.decoded._id })

        try {

            const createdResume = await event.save()

            const creator = await User.findById(req.decoded._id)

            if (!creator) {

                throw new Error('User not found.')

            }

            creator.resumes.push(resume)

            await creator.save()

            return createdResume

        } catch (err) {

            console.log(err)

            throw err

        }

    }

}

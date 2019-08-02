const { Jobs } = require('../model')

module.exports = {

    addJob: async (args, req) => {

        const { email } = req.decoded

        const { company, position, location, applied, interview, offer } = args.jobInput

        try {

            const newJob = new Jobs({
                user: email,
                company,
                position,
                location,
                applied,
                interview,
                offer
            })

            await newJob.save()

            return newJob

        } catch (err) {

            throw err

        }

    },

    jobs: async (args, req) => {

        const { email } = req.decoded

        try {

            return await Jobs.find({ user: email })

        } catch (err) {

            throw err

        }

    }

}

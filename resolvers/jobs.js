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

    updateJob: async (args, req) => {

        const { email } = req.decoded

        const { _id, company, position, location, applied, interview, offer } = args.upJob

        try {

            const check = await Jobs.findOne({ _id })

            if (check.user === email) {

                return await Jobs.findOneAndUpdate({ _id }, { company, position, location, applied, interview, offer }, { new: true })

            } else {

                throw new Error(`You are not ${check.user}. Why are you trying to edit somebody else's job??`)

            }


        } catch (err) {

            throw err

        }

    },

    delJob: async (args, req) => {

        const { email } = req.decoded

        const { _id } = args

        try {

            const check = await Jobs.findOne({ _id })

            if (check.user === email) {

                await Jobs.findByIdAndDelete({ _id })

                return await Jobs.find({ user: email })

            } else {

                throw new Error(`You are not ${check.user}. Why are you trying to delete somebody else's job??`)

            }

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

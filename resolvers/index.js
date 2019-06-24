const authRes = require('./auth')
const resumeRes = require('./resume')

module.exports = {
    ...authRes,
    ...resumeRes
}

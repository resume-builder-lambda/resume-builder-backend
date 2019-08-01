const authRes = require('./auth')
const userRes = require('./user')
const jobRes = require('./jobs')

module.exports = {
    ...authRes,
    ...userRes,
    ...jobRes
}

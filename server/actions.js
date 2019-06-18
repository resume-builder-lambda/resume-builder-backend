const db = require('../data')

module.exports = {
    find: (database, username) => {
        const query = db(`${database}`)

        return username ?
            query.where({ username }).first()
            :
            query
    },

    add: async (database, addition) => {
        await db(`${database}`).insert(addition)

        return await db(`${database}`).where({ username: addition.username }).first()
    }
}
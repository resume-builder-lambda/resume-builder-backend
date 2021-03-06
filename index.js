require('dotenv').config()

// Dependencies
const express = require('express')
const gpqHttp = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

// Custom
const gqlSchema = require('./schema')
const gqlResolver = require('./resolvers')

const port = process.env.PORT || 5000

// Server
const server = express()
server.use(require('./middleware').auth)
server.use(express.json())

// GraphQL
server.use('/graphql', cors(), gpqHttp({
    schema: gqlSchema,
    rootValue: gqlResolver,
    graphiql: true
}))

// Mongoose
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gqltest-dbk60.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        server.listen(port, () => {
            console.log(`\n===================================\n ** Server running on port ${port} ** \n===================================\n`)
        })
    })
    .catch(err => {
        console.log(err)
    })

const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type User {
    _id: ID!
    email: String!
    password: String!
    role: String!
    google: Google
}

type Google {
    token: String!
    name: String!
    image: String!
}

type AuthData {
    _id: ID!
    token: String
    tokenExp: Int!
}

type Job {
    _id: ID!
    company: String!
    position: String!
    location: String!
    applied: Boolean!
    interview: Boolean!
    offer: Boolean!
}

type Jobs {
    user: String!
    jobs: [Job!]
}

input GoogleData {
    email: String!
    password: String!
    token: String!
    image: String!
    name: String!
}

input UserInput {
    email: String!
    password: String!
    role: String!
    google: GoogleData
}

input JobInput {
    company: String!
    position: String!
    location: String!
    applied: Boolean!
    interview: Boolean!
    offer: Boolean!
}

input UpJob {
    _id: ID!
    company: String!
    position: String!
    location: String!
    applied: Boolean!
    interview: Boolean!
    offer: Boolean!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    user: User!
    jobs: [Job!]
}

type RootMutation {
    createUser(userInput: UserInput): AuthData!
    createGoogleUser(googleData: GoogleData): AuthData!
    addJob(jobInput: JobInput): Job!
    updateJob(upJob: UpJob): Job!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)

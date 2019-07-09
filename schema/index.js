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

input GoogleData {
    email: String!
    password: String!
    token: String!
    image: String!
    name: String!
}

input UserInput {
    email: String!
    password: String
    role: String!
    google: [GoogleData!]
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): AuthData
    createGoogleUser(googleData: GoogleData): AuthData
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)

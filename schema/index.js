const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type User {
    _id: ID!
    email: String!
    password: String!
    role: String!
    google: Google
    github: GitHub
    linkedin: LinkedIn
}

type Google {
    token: String!
    name: String!
    image: String!
}

type LinkedIn {
    token: String!
    name: String!
    image: String!
}

type GitHub {
    username: String!
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

input GitHubData {
    email: String!
    password: String!
    username: String!
    image: String!
    name: String!
}

input LinkedInData {
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
    linkedin: LinkedInData
    github: GitHubData
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): AuthData!
    createGoogleUser(googleData: GoogleData): AuthData!
    createLinkedInUser(linkedInData: LinkedInData): AuthData!
    createGitHubUser(gitHubData: GitHubData): AuthData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)

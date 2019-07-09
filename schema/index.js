const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type User {
    _id: ID!
    email: String!
    password: String!
    role: String!
    resumes: [Resume!]
    google: Google
}

type Google {
    token: String!
    name: String!
    image: String!
}

type Resume {
    _id: ID!
    title: String!
    description: String
    niche: String
    creator: User!
    createdAt: String!
    updatedAt: String!
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
    resumes: [ResumeInput!]
    google: [GoogleData!]
}

input ResumeInput {
    title: String!
    description: String
    niche: String
    creator: String!
}

type RootQuery {
    resumes: [Resume!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createResume(resumeInput: ResumeInput): Resume
    createUser(userInput: UserInput): AuthData
    createGoogleUser(googleData: GoogleData): AuthData
    deleteResume(resumeId: ID!): Resume!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)

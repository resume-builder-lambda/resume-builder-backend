# ![CRP Logo](https://avatars0.githubusercontent.com/u/49796992?s=88&v=4 "CRP Logo") CRP Backend 

## Endpoint (https://lambda-crp.herokuapp.com/graphql)

### Auth
 Query/Mutation | Required Fields | Description
---------------:|:---------------:|------------
 mutation `createUser` | userInput: { email, role, password } | Checks for provided email within database. <br> If none exists, creates a new user. 
 query `login` | ( email, password ) | Checks credentials against users in database.
 #### Possible fields for `login` query or `createUser` mutation:
 ```javascript
{
  _id: String,
  token: String,
  tokenExp: Integer(in hours)
}
 ```
 ---
### Users (**Token required**)
 Query/Mutation | Required Fields | Description
---------------:|:---------------:|------------
query `users` | N/A | Returns the user that is logged in.
#### Possible fields returned for `users` query:
```javascript
{
  _id: String,
  email: String,
  password: String,
  role: String,
  google: {
    token: String,
    name: String,
    image: String
  }
}
```
---
 ### Jobs (**Token required**)
 Query/Mutation | Required Fields | Description
---------------:|:---------------:|------------
mutation `addJob` | jobInput(see below) | Creates a new job.
query `jobs` | N/A | Returns a list of all jobs corresponding to logged in user (for now).
#### Required fields for `addJob` mutation:
```javascript
{
  _id: String,
  company: String,
  position: String,
  location: String,
  applied: true,
  interview: false,
  offer: false
}
```
#### Possible returned fields for `addJob` mutation and `jobs` query:
```javascript
{
  user: String,
  company: String,
  position: String,
  location: String,
  applied: true,
  interview: false,
  offer: false
}
```
---

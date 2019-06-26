# CRP Backend

## Endpoint (https://lambda-crp.herokuapp.com/)

### Auth
 Query/Mutation | Required Fields | Description
---------------:|:---------------:|------------
 mutation `createUser` | { email, role, password } | Checks for provided email within database. <br> If none exists, creates a new user. 
 query `login` | { email, password } | Checks credentials against users in database.
 #### Possible fields for `login` query or `createUser` mutation:
 ```javascript
{
  _id: String,
  token: String,
  tokenExp: Integer(in hours)
}
 ```
---
 ### Resume (**Login required**)
 Query/Mutation | Required Fields | Description
---------------:|:---------------:|------------
mutation `createResume` | { title, creator } | Creates a new resume.
query `resumes` | N/A | Returns a list of all resumes in the database (for now).
#### Possible fields for `createResume` mutation *and* `resumes` query:
```javascript
{
  _id: String
  title: String,
  description: String,
  niche: String,
  creator: { User object },
  createdAt: String,
  updatedAt: String
}
```

# Resume Builder Backend

## Endpoints

### Auth
Request | Endpoint | Required Fields | Description
--------|----------|-----------------|------------
POST | `/auth/register` | { username, password } | Accepts a username and password, checks against existing usernames, and returns an auth object if all goes right
#### Auth object shape
```
{
  "username": string,
  "id": integer,
  "token": string
}
```

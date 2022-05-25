# Backend

### Status HTTP
* 200 - User list success
* 200 - User list by   ID success
* 202 - User created success
* 203 - User updated success 
* 204 - User deleted success

### Routes
* GET: `/users`  - List all users
* GET: `/users/:id` - List user by ID
* POST: `/users` - Create new user
* PUT: `/users` - Update user
* DELETE: `/users` - Delete user by ID

### Create new User
TYPE

```
type UserData = {
  username: string
  password: string
  is_admin: boolean
}
```

JSON

```
{
  "username": "myName",
  "password": "123456",
  "is_admin": true
}
```
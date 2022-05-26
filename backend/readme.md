# **Backend**

## **Issues or new implementations**
[ - ] Set specific status and messages to errors in all methods (example: DeleteUserController.ts)

## **Routes**
* GET: `/users`  - List all users
* GET: `/users/:id` - List user by ID
* POST: `/users` - Create new user
* PUT: `/users` - Update user
* DELETE: `/users/:id` - Delete user by ID

## **List all Users**
On success
* status: 200

On fail
* status: 400
* message: 'Bad request',

METHOD: get

URL: /users

Response JSON
```
[
  {
    "id": "sf5f5d52dv15d1vd51v2d",
    "username": "Leandro",
    "password": "123456",
    "is_admin": true,
    "created_at": "2022-05-23T11:38:50.729Z",
    "updated_at": "2022-05-23T11:38:50.729Z"
  },
  {
    "id": "asd5f5d5s6e6t2yhju1fq",
    "username": "Alexandra",
    "password": "123456",
    "is_admin": false,
    "created_at": "2022-05-23T11:39:00.585Z",
    "updated_at": "2022-05-23T11:39:00.585Z"
  },
]
```

## **List user by ID**
On success
* status: 200

On fail
* status: 400
* message: 'Bad request',

METHOD: get

URL: /users/:id

Request PARAMS - `/sf5f5d52dv15d1vd51v2d`

Response JSON
```
[
  {
    "id": "sf5f5d52dv15d1vd51v2d",
    "username": "Leandro",
    "password": "123456",
    "is_admin": true,
    "created_at": "2022-05-23T11:38:50.729Z",
    "updated_at": "2022-05-23T11:38:50.729Z"
  },
]
```

## **Create new user**
On success
* status: 200

On fail
* status: 400
* message: 'Bad request',

Type
```
type UserData = {
  username: string
  password: string
  is_admin: boolean
}
```
METHOD: post

URL: /users

Request JSON - body

```
{
  "username": "Yumi",
  "password": "123456",
  "is_admin": false
}
```

Response JSON
```
{
  "id": "dfghtg562d2f6ggree9wa",
  "username": "Yumi",
  "password": "123456",
  "is_admin": false,
  "created_at": "2022-05-24T17:37:19.750Z",
  "updated_at": "2022-05-24T17:37:19.750Z"
}
```

## **Update user**
On success
* status: 200

On fail
* status: 400
* message: 'Bad request',

Type
```
type UserData = {
  username: string
  password: string
  is_admin: boolean
}
```
METHOD: put

URL: /users/:id

Request PARAMS - `/dfghtg562d2f6ggree9wa`

Request JSON - body

```
{
  "username": "Yumii",
  "password": "123456",
  "is_admin": true
}
```

Response JSON
```
{
  "id": "dfghtg562d2f6ggree9wa",
  "username": "Yumii",
  "password": "123456",
  "is_admin": true,
  "created_at": "2022-05-24T17:37:19.750Z",
  "updated_at": "2022-05-24T17:41:07.750Z"
}
```

## **Delete user by ID**
On success
* status: 200
* message: 'User deleted with success',

On fail
* status: 400
* message: 'Bad request',

METHOD: delete

URL: /users/:id

Request PARAMS - `/dfghtg562d2f6ggree9wa`
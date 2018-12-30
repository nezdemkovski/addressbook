# Addressbook

[![Build Status](https://travis-ci.com/yakovlevyuri/addressbook.svg?branch=master)](https://travis-ci.com/yakovlevyuri/addressbook)

## Before you start

First rename `.env-sample` file to `.env`. It contains all default values for proper work on your local machine.

```
PORT=

# MongoDB related
MONGO_URL=

# JWT Secret passphrase
JWT_SECRET=

# Firebase related
FIREBASE_DB_URL=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## How to run the app on localhost

```bash
$ npm install
$ npm run dev

# or

$ yarn
$ yarn dev
```

## How to run tests

```bash
$ npm run test

# or

$ yarn test
```

## API Documentation

### **Register a new user**

Returns json data about a newly registered user.

- **URL**

  /users/register

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `email=[string]`<br />
  `password=[string]`<br />
  `username=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ data: {"_id": "...", "email": "...", "...", "username": "...", "createdAt": "...", "updatedAt": "..." }, "token": "..."}`

- **Error Response:**

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "errors": [ { "location": "body", "param": "email", "msg": "Invalid email format" }, { "location": "body", "param": "password", "msg": "Password must be at least 5 chars long" }, { "location": "body", "param": "username", "msg": "Username cannot be empty value" } ] }`

  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "errors": [ { "location": "body", "param": "email", "value": "...", "msg": "E-mail already in use" } ] }`

### **Login user**

Returns json data about a successfully authorized user.

- **URL**

  /users/signin

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  `email=[string]`<br />
  `password=[string]`<br />
  `username=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ data: {"_id": "...", "email": "...", "...", "username": "...", "createdAt": "...", "updatedAt": "..." }, "token": "..."}`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "errors": "Unauthorized" }`

### **Get list of contacts**

Returns list of contacts of authorized user.

- **URL**

  /contacts/

- **Method:**

  `GET`

- **Headers**

  **Required:**

  `Authorization`: Bearer token

- **URL Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ data: [{"_id": "...", "email": "...", "...", "username": "...", "createdAt": "...", "updatedAt": "..." }, { ... }, { ... }]}`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "errors": "Unauthorized" }`

### **Create new contact**

Returns a newly created contact.

- **URL**

  /contacts/create

- **Method:**

  `POST`

- **Headers**

  **Required:**

  `Authorization`: Bearer token

- **URL Params**

  None

- **Data Params**

  **Required:**

  `fullName=[string]`<br />
  `phoneNumber=[string]`<br />

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "data": { "userId": "...", "fullName": "...", "phoneNumber": "..." }}`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "errors": "Unauthorized" }`

## License

MIT 2018 Yuri Yakovlev

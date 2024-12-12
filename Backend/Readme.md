# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/users/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).




## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token## `/captains/register` Endpoint


# Backend API Documentation for Captain Registration

## `/captains/register` Endpoint

### Description

Registers a new captain by creating an account with the provided information, including personal and vehicle details.

---

### HTTP Method

`POST`

---

### Request Body

The request body should be in JSON format and include the following fields:

- **fullname** (object):
  - **firstname** (string, required): Captain's first name (minimum 3 characters).
  - **lastname** (string, optional): Captain's last name (minimum 3 characters).
- **email** (string, required): Captain's email address (must be unique and valid).
- **password** (string, required): Captain's password (minimum 6 characters).
- **vehicle** (object):
  - **color** (string, required): Vehicle color (minimum 3 characters).
  - **plate** (string, required): Vehicle plate number (minimum 3 characters).
  - **capacity** (number, required): Vehicle capacity (minimum value: 1).
  - **vehicleType** (string, required): Type of vehicle (must be one of `car`, `motorcycle`, or `auto`).

---

### Request Validation Rules

- **email**: Must be a valid email address.
- **fullname.firstname**: Must be at least 3 characters long.
- **password**: Must be at least 6 characters long.
- **vehicle.color**: Must be at least 3 characters long.
- **vehicle.plate**: Must be at least 3 characters long.
- **vehicle.capacity**: Must be a number with a minimum value of 1.
- **vehicle.vehicleType**: Must be one of the predefined values: `car`, `motorcycle`, `auto`.

---

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Blue",
    "plate": "AB123CD",
    "capacity": 4,
    "vehicleType": "car"
  }
}

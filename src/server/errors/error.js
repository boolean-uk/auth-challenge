class APIError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}
  
class NotFoundError extends APIError {
    constructor() {
      super(404, 'No user found by this username')
    }
}

class AlreadyExistsError extends APIError {
    constructor(message) {
      super(409, `${message} already exists`)
    }
}

class IncorrectPasswordError extends APIError {
    constructor() {
      super(401, 'Password is incorrect')
    }
}

class MissingFieldsError extends APIError {
    constructor() {
      super(400, 'Missing fields in body')
    }
}

class AuthorizationMissingError extends APIError {
    constructor() {
      super(400, 'Authorization missing in headers')
    }
}

class UnauthorizedError extends APIError {
    constructor() {
      super(401, 'Must be logged in to create or see movies')
    }
}
  
export {
    NotFoundError,
    APIError,
    AlreadyExistsError,
    IncorrectPasswordError,
    MissingFieldsError,
    AuthorizationMissingError,
    UnauthorizedError
}

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

class AlreadyExists extends APIError {
    constructor(message) {
      super(409, `${message} already exists`)
    }
}

class IncorrectPassword extends APIError {
    constructor() {
      super(401, 'Password is incorrect')
    }
}

class MissingFields extends APIError {
    constructor() {
      super(400, 'Missing fields in body')
    }
}
  
export {
    NotFoundError,
    APIError,
    AlreadyExists,
    IncorrectPassword,
    MissingFields
}

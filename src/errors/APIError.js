class APIError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

class MissingFieldsError extends APIError {
  constructor(message) {
    super(400, message)
  }
}

class ExistingUniqueFieldError extends APIError {
  constructor(message) {
    super(409, message)
  }
}

class UserNotFoundError extends APIError {
  constructor(message) {
    super(404, message)
  }
}

class InvalidCredentialsError extends APIError {
  constructor(message) {
    super(401, message)
  }
}

class NotValidTokenError extends APIError {
    constructor(message) {
        super(403, message)
    }
}

export default APIError
export {
  MissingFieldsError,
  ExistingUniqueFieldError,
  UserNotFoundError,
  InvalidCredentialsError,
  NotValidTokenError,
}

class MismatchLoginError extends Error {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(message);
    this.name = "MismatchLoginError";
  }
}

class TokenError extends Error {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(message);
    this.name = "TokenError";
  }
}

export { MismatchLoginError, TokenError };

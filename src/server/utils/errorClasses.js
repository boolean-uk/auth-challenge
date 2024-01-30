class MismatchLoginError extends Error {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(message);
    this.name = "MismatchLoginError";
  }
}

export { MismatchLoginError };

// eslint-disable-next-line no-unused-vars
import * as Types from "./types.d";

/**
 * @param {Error} error
 * @param {Types.ExResponse} res
 * @returns {void}
 */
function handleError(error, res) {
  res.status(500).json({ error: error });
}

export { handleError };

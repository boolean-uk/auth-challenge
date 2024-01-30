import { handleError } from "../../utils/error.js";
import { TokenError } from "../../utils/errorClasses.js";
// eslint-disable-next-line no-unused-vars
import * as Types from "../../utils/types.d.js";
import { validateToken } from "../../utils/webToken.js";

/**
 * @param {Types.ExRequest} req
 * @param {Types.ExResponse} res
 * @param {Types.ExNext} next
 */
async function validateLoginSession(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new TokenError("Bearer token required");
    }
    const [tokenType, token] = authorization.split(" ");

    if (tokenType !== "Bearer" || !token) {
      throw new TokenError("Bearer token required");
    }

    validateToken(token);
    next();
  } catch (error) {
    handleError(error, res);
  }
}

export { validateLoginSession };

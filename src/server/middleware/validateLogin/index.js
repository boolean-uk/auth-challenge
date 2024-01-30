import { handleError } from "../../utils/error";
import { TokenError } from "../../utils/errorClasses";
// eslint-disable-next-line no-unused-vars
import * as Types from "../../utils/types.d";
import { validateToken } from "../../utils/webToken";

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

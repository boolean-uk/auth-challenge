import { handleError } from "../../utils/error.js";
// eslint-disable-next-line no-unused-vars
import * as Types from "../../utils/types.d.js";

/**
 * @param {import("zod").AnyZodObject} schema
 * @returns {(req: Types.ExRequest, res: Types.ExResponse, next: Types.ExNext) => void}
 */
function validateRequest(schema) {
  return function (req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      handleError(error, res);
    }
  };
}

export { validateRequest };

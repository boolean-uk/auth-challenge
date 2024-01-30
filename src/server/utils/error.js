import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { ZodError } from "zod";
import { MismatchLoginError } from "./errorClasses.js";

// eslint-disable-next-line no-unused-vars
import * as Types from "./types.d.js";

/**
 * @param {Error} error
 * @param {Types.ExResponse} res
 * @returns {void}
 */
function handleError(error, res) {
  if (error instanceof PrismaClientKnownRequestError) {
    handlePrismaError(error, res);
    return;
  }

  if (error instanceof ZodError) {
    handleZodError(error, res);
    return;
  }

  if (error instanceof MismatchLoginError) {
    handleMismatchLoginError(error, res);
    return;
  }

  res.status(500).json({ error: error.message });
}

const prismaErrors = {
  P2002: createPrismaUniquePayload,
};

/**
 * @param {import("@prisma/client").Prisma.PrismaClientKnownRequestError} error
 * @param {Types.ExResponse} res
 * @returns {void}
 */
function handlePrismaError(error, res) {
  const handler = prismaErrors[error.code];

  if (handler) {
    const payload = handler(error);
    res.status(payload.error.code).json(payload);
    return;
  }

  res.status(500).json({ error: error });
}

/**
 * @param {import("@prisma/client").Prisma.PrismaClientKnownRequestError} error
 * @returns {Types.ApiError}
 */
function createPrismaUniquePayload(error) {
  const fieldErrors = {};
  if (Array.isArray(error.meta.target)) {
    error.meta.target.forEach((field) => {
      fieldErrors[field] = ["Entry already exists"];
    });
  }

  return {
    error: {
      formErrors: [],
      fieldErrors,
      code: 409,
    },
  };
}

/**
 * @param {import("zod").ZodError} error
 * @param {Types.ExResponse} res
 * @returns {void}
 */
function handleZodError(error, res) {
  const payload = createZodErrorPayload(error);
  res.status(payload.error.code).json(payload);
}

/**
 * @param {import("zod").ZodError} error
 * @returns {Types.ApiError}
 */
function createZodErrorPayload(error) {
  const flatError = error.flatten();

  return {
    error: {
      formErrors: flatError.formErrors,
      fieldErrors: flatError.fieldErrors,
      code: 400,
    },
  };
}

/**
 * @returns {Types.ApiError}
 */
function createMismatchErrorPayload() {
  return {
    error: {
      formErrors: ["Unrecognized username and password combination"],
      fieldErrors: {},
      code: 401,
    },
  };
}

/**
 * @param {import("../utils/errorClasses.js").MismatchLoginError} error
 * @param {Types.ExResponse} res
 * @returns {void}
 */
function handleMismatchLoginError(error, res) {
  const payload = createMismatchErrorPayload();
  res.status(payload.error.code).json(payload);
}

export { handleError };

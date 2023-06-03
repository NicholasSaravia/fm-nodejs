import { ValidationChain, body, validationResult } from "express-validator";

export const requiredString = (param: string): ValidationChain =>
  body(param).isString().notEmpty();

export const optionalString = (param: string): ValidationChain =>
  body(param).optional().isString();

export const errorValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};

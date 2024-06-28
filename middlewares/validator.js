const { check, validationResult } = require("express-validator");
exports.registerRules = () => [
  check("fullName", "is required").notEmpty(),
  check("gmail", "is required").notEmpty(),
  check("gmail", "is not a valid gmail").isEmail(),
  check("password", "is required").notEmpty(),
  check("password", "too short min 6").isLength({ min: 6 }),
];
exports.validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(406).json({ errors: errors.array() });
};

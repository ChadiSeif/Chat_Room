const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    // username must be an email
    body("username").not().isEmpty().withMessage("Invalid Value for username"),
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password")
      .isLength({ min: 3 })
      .withMessage("Minimum length required is 3"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
module.exports = { userValidationRules, validate };

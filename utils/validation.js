const Yup = require('yup');

module.exports.contentSchema = Yup
.string()
  .trim()
  .matches(/[a-z0-9\s]+/i)
  .required();

  module.exports.loginSchema = Yup
.string()
  .trim()
  .matches(/[a-z]{3,15}/i)
  .required();

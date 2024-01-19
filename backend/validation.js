const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "de"] },
  }),
  message: Joi.string().min(3).max(1000).required(),
  id: Joi.number(),
});

// try {
//   const value = schema.validateAsync();
// } catch (err) {
//   console.log(err);
// }

module.exports = {
  schema,
};

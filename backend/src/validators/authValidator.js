const Joi = require("joi")

const registerSchema =Joi.object({
  name:Joi.string().required().min(3),
  email:Joi.string().email().required(),
  password:Joi.string().required().min(8),
});

const loginSchema = Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().required().min(8),
});

const refreshSchema = Joi.object({});

module.exports = {
  registerSchema,loginSchema,refreshSchema
}

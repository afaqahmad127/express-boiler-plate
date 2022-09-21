import Joi from "joi";

const register = {
  body: Joi.object().keys({
    personal_name: Joi.string().required(),
    company_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const email = {
  params: Joi.object().keys({
    id: Joi.string().email().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    personal_name: Joi.string(),
    company_name: Joi.string(),
    email: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  id,
  update,
  email,
};

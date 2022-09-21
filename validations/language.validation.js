import Joi from "joi";

const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string().max(2).min(2),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().max(2).min(2).required(),
  }),
};

export default {
  id,
  update,
  add,
};

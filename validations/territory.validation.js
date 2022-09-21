import Joi from "joi";

const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const update = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(20),
  }),
};

const add = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(20).required(),
  }),
};

export default {
  id,
  update,
  add,
};

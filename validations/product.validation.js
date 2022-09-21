import Joi from "joi"
const id = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}

const userid = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
}

const update = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.number().allow(""),
    brand_logo: Joi.allow(""),
  }),
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}

const add = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object(),
    brand_logo: Joi.object(),
  }),
}

export default {
  id,
  update,
  add,
  userid,
}

import Joi from "joi";

const id = Joi.string().uuid();

const getUserSchema = Joi.object({
  id: id.required()
})

export { getUserSchema }

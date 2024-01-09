import Joi from "joi";

const id = Joi.string().uuid();

const getCategorySchema = Joi.object({
  id: id.required()
})

export { getCategorySchema }

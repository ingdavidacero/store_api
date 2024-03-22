import Joi from "joi";

const id = Joi.number().integer().id();
const name = Joi.string();

const getCategorySchema = Joi.object({
  id: id.required()
});

const createCategorySchema = Joi.object({
  name: name.required()
});

const updateCategorySchema = Joi.object({
  name: name
});

export { getCategorySchema, createCategorySchema,updateCategorySchema }

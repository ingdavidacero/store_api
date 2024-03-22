import Joi from "joi";

const id = Joi.string().id();
const name = Joi.string().min(3).max(15);
const price = Joi.number().min(8);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().id();
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required()
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  priceMin,
  priceMax: priceMax.when('priceMin',{
    is: Joi.number().integer().required(),
    then: Joi.required()
  })
})

export { createProductSchema,updateProductSchema,getProductSchema,queryProductSchema }

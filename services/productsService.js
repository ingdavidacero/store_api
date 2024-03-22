import Boom from "@hapi/boom";
import sequelize from "../libs/sequelize.js";
import { Op } from "sequelize";
const models  = sequelize.models;

class ProductsService{

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async delete(id){
    const product =  await this.findOne(id);
    await product.destroy();
    return {
      id
    };
  }

  async find(query){
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit);
      options.offset = parseInt(offset);
    }
    const { price } = query;

    if(price){
      options.where.price = price;
    }

    const { priceMin, priceMax } = query;

    if(priceMin && priceMax){
      options.where.price = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id);
    if(!product){
      throw Boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }
}

export default ProductsService;

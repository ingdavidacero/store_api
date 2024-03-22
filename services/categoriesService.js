import Boom from "@hapi/boom";
import sequelize from "../libs/sequelize.js";
const models  = sequelize.models;

class CategoriesService{
  constructor(){}

  async create(data){
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async delete(id){
    const category =  await this.findOne(id);
    await category.destroy();
    return {
      id
    };
  }

  async find(){
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id){
    const category = await models.Category.findByPk(id,{include:['products']});
    if(!category){
      throw Boom.notFound('Category not found');
    }

    return category;
  }

  async update(id, changes){
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }
}

export default CategoriesService;

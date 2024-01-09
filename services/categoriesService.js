import { faker } from "@faker-js/faker";
import Boom from "@hapi/boom";

class CategoriesService{
  constructor(){
    this.categories = [];
    this.generate();
  }

  async generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
        this.categories.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.department()
        }
      );
    }
  }

  async find(){
    return this.categories;
  }
  async findOne(id){
    const category = this.categories.find(item => item.id===id);
    if(!category){
      throw Boom.notFound('Category not found');
    }
    return category;
  }
}

export default CategoriesService;

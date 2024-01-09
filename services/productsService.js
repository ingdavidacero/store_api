import { faker } from "@faker-js/faker";
import Boom from "@hapi/boom";

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        }
      );
    }
  }

  async create(data){
    const newProduct = {
      id:faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(
        ()=>{
          resolve(this.products)
        },4000
      );
    })
  }

  async findOne(id){
    const product = this.products.find(item => item.id ===id);
    if(!product){
      throw Boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw Boom.conflict('Product is block')
    }
    return product;
  }

  async update(id, data){
    const index = this.products.findIndex(item => item.id ===id);
    if(index === -1){
      throw Boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id ===id);
    if(!index === -1){
      throw Boom.notFound('Product not found');
    }
    this.products.splice(index,1);
    return { id };
  }
}

export default ProductsService;

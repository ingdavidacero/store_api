import Boom from "@hapi/boom";
import sequelize from "../libs/sequelize.js";
const models = sequelize.models;

class CustomersService{
  constructor(){}

  async create(data){
    const newCustomer = await models.Customer.create(
      data,
      {include:['user']}
    );
    return newCustomer;
  }

  async delete(id){
    const customer =  await this.findOne(id);
    await customer.destroy();
    return {
      id
    };
  }

  async find(){
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw Boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes){
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }
}

export default CustomersService;

import Boom from "@hapi/boom";
import sequelize from "../libs/sequelize.js";
const models  = sequelize.models;

class OrdersService{
  constructor(){}

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async delete(id){
    const category =  await this.findOne(id);
    await category.destroy();
    return {
      id
    };
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id,{
      include:[{
        association: 'customer',
        include: ['user']
      },
      'items'
    ]
    });
    if(!order){
      throw Boom.notFound('Order not found');
    }

    return order;
  }

  async update(id, changes){
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }
}

export default OrdersService;

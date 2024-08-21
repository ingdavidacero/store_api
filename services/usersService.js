import Boom from "@hapi/boom";
import sequelize from "../libs/sequelize.js";
import bcrypt from 'bcrypt';
const models  = sequelize.models;

class UsersService{

  async create(data){
    const pass_hash = await bcrypt.hash(data.password,10);
    const newUser = await models.User.create({
      ...data,
      password: pass_hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async delete(id){
    const user =  await this.findOne(id);
    await user.destroy();
    return {
      id
    };
  }
  async find(){
    const rta = await models.User.findAll({
      include:['customer']
    });
    return rta;
  }

  async findByEmail(email){
    const rta = await models.User.findOne({
      where: {email}
    });
    return rta;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw Boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

}

export default UsersService;

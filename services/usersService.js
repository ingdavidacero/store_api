import { faker } from "@faker-js/faker";
import Boom from "@hapi/boom";

class UsersService{
  constructor(){
    this.users = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push(
        {
          id: faker.datatype.uuid(),
          name: faker.person.fullName(),
          gender: faker.person.gender()
        }
      );
    }
  }

  async find(){
    return this.users;
  }

  async findOne(id){
    const user = this.users.find(item => item.id===id);
    if(!user){
      throw Boom.notFound('User not found');
    }
    return user;
  }
}

export default UsersService;

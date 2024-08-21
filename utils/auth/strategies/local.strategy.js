import { Strategy } from 'passport-local';
import UsersService from '../../../services/usersService.js';
import Boom from "@hapi/boom";
import bcrypt from 'bcrypt';

const service = new UsersService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done)=>{
  try {
    const user = await service.findByEmail(email);
    if(!user){
      done(Boom.unauthorized(),false);
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      done(Boom.unauthorized(),false);
    }
    delete user.dataValues.password;
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default LocalStrategy;

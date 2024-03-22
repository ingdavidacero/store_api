import { User, UserSchema} from "./user.model.mjs";
import { Product, ProductSchema} from "./product.model.mjs";
import { Category, CategorySchema} from "./category.model.mjs";
import { Customer, CustomerSchema} from "./customer.model.mjs";
import { Order, OrderSchema} from "./order.model.mjs";
import { OrderProduct, OrderProductSchema } from "./order-product.model.mjs";

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  //Asociaciones
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  User.associate(sequelize.models);
}

export default setupModels;

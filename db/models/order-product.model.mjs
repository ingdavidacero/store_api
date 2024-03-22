import { Model, DataTypes, Sequelize } from "sequelize";
import { ORDER_TABLE } from "./order.model.mjs";
import { PRODUCT_TABLE } from "./product.model.mjs";

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount:{
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: ORDER_TABLE,
      key:'id'
    },
    onUpdate: 'CASCADE'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references:{
      model: PRODUCT_TABLE,
      key:'id'
    },
    onUpdate: 'CASCADE'
  }
}

class OrderProduct extends Model{
  static associate(models){
    //
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

export {ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct};

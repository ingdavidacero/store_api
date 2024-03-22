'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await import('../models/customer.model.mjs').then(({CUSTOMER_TABLE,CustomerSchema}) => {
      queryInterface.changeColumn(CUSTOMER_TABLE,'user_id',{
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true
      });
    });
  },

  async down (queryInterface) {

  }
};

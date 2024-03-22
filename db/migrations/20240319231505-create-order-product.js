'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await import('../models/order-product.model.mjs').then(({ORDER_PRODUCT_TABLE,OrderProductSchema}) => {
      queryInterface.createTable(ORDER_PRODUCT_TABLE,OrderProductSchema);
    });
  },

  async down (queryInterface, Sequelize) {
    await import('../models/order-product.model.mjs').then(({ORDER_PRODUCT_TABLE}) => {
      queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    });
  }
};

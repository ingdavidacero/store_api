'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await import('../models/order.model.mjs').then(({ORDER_TABLE,OrderSchema}) => {
      queryInterface.createTable(ORDER_TABLE,OrderSchema);
    });
  },

  async down (queryInterface) {
    await import('../models/order.model.mjs').then(({ORDER_TABLE}) => {
      queryInterface.dropTable(ORDER_TABLE);
    });
  }
};

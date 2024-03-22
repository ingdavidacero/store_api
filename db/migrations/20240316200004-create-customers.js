'use strict';

module.exports = {
  async up (queryInterface) {
    await import('../models/customer.model.mjs').then(({CUSTOMER_TABLE,CustomerSchema}) => {
      queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
    });
  },

  async down (queryInterface) {
    await import('../models/customer.model.mjs').then(({CUSTOMER_TABLE}) => {
      queryInterface.dropTable(CUSTOMER_TABLE);
    });
  }
};

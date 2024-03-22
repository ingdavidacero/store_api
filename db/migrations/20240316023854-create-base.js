'use strict';

module.exports = {
  async up (queryInterface) {
    await import('../models/user.model.mjs').then(({USER_TABLE,UserSchema}) => {
      queryInterface.createTable(USER_TABLE,UserSchema);
    });
  },

  async down (queryInterface, Sequelize) {

  }
};

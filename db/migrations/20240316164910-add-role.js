'use strict';

module.exports = {
  async up (queryInterface) {
    await import('../models/user.model.mjs').then(({USER_TABLE,UserSchema}) => {
      queryInterface.addColumn(USER_TABLE, 'role',UserSchema.role);
    });
  },

  async down (queryInterface) {
    await import('../models/user.model.mjs').then(({USER_TABLE,UserSchema}) => {
      queryInterface.removeColumn(USER_TABLE, 'role',UserSchema.role);
    });
  }
};

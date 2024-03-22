'use strict';

module.exports = {
  async up (queryInterface) {
    await import('../models/category.model.mjs').then(({CATEGORY_TABLE,CategorySchema}) => {
      queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    });

    await import('../models/product.model.mjs').then(({PRODUCT_TABLE,ProductSchema}) => {
      queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
    });
  },

  async down (queryInterface) {
    await import('../models/category.model.mjs').then(({CATEGORY_TABLE}) => {
      queryInterface.dropTable(CATEGORY_TABLE);
    });

    await import('../models/product.model.mjs').then(({PRODUCT_TABLE}) => {
      queryInterface.dropTable(PRODUCT_TABLE);
    });
  }
};

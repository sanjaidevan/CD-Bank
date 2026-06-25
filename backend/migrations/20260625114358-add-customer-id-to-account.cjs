'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("acc_tbl", "customer_id", {
      type: Sequelize.UUID,
      allowNull:false,
      references: {
        model: "customer_tbl",
        key: 'customer_id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('acc_tbl','customer_id');
  }
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("accountTable", "customerId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "customerTable",
        key: 'customerId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('accountTable', 'customerId');
  }
};
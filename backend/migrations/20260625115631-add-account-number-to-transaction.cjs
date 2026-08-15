module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transactionTable", "accountNumber", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "accountTable",
        key: 'accountNumber'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transactionTable', 'accountNumber');
  }
};
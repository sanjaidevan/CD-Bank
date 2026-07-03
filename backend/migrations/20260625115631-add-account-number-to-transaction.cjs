module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transaction_tbl", "accountNumber", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "acc_tbl",
        key: 'accountNumber'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transaction_tbl', 'accountNumber');
  }
};
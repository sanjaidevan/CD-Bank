module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("transaction_tbl", "acc_num", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "acc_tbl",
        key: 'acc_num'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transaction_tbl', 'acc_num');
  }
};
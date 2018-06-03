'use strict';

module.exports = app => {
  const { INTEGER, FLOAT } = app.Sequelize;
  const Sales = app.model.define('sales', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    totalNums: { type: INTEGER, defaultValue: 0 },
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'sales',
  });
  Sales.associate = () => {
    Sales.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
    Sales.belongsTo(app.model.Items, { foreignKey: 'itemId', onDelete: 'CASCADE', constraints: false });
  };
  return Sales;
};

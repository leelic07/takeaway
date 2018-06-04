'use strict';

module.exports = app => {
  const { INTEGER, FLOAT, DATE, NOW } = app.Sequelize;
  const Reports = app.model.define('reports', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    settlTime: { type: DATE, defaultValue: NOW },
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
    deliverMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    couponMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    activityMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    realTotalMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    totalRefundMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    platformServiceFee: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 平台服务费
    realIncome: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 实际收入
    wxProcedures: { type: FLOAT(5, 2), defaultValue: 0.00 },
    settleMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    startTime: { type: DATE, defaultValue: null },
    endTime: { type: DATE, defaultValue: null },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'reports',
  });
  Reports.associate = () => {
    Reports.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
  };
  return Reports;
};

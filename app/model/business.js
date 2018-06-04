'use strict';

module.exports = app => {
  const { INTEGER, DATE, FLOAT, NOW } = app.Sequelize;
  const Business = app.model.define('business', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    settlTime: { type: DATE, defaultValue: NOW }, // 结算时间
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 总营业额
    totalRealTotalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 总实际支付金额
    allCount: { type: INTEGER, defaultValue: 0 }, // 总订单数
    successCount: { type: INTEGER, defaultValue: 0 },
    refundCount: { type: INTEGER, defaultValue: 0 },
    refundTotalMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    totalPackingCharge: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 总打包费
    totalDeliverMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    totalCouponMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    totalActivityMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    startTime: { type: DATE, defaultValue: null },
    endTime: { type: DATE, defaultValue: null },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'business',
  });
  Business.associate = () => {
    Business.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
  };
  return Business;
};

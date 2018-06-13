'use strict';

module.exports = app => {
  const { INTEGER, STRING, FLOAT, DATE } = app.Sequelize;
  const Coupons = app.model.define('coupons', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), defaultValue: '' },
    fullMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 满多少送券
    couponMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 优惠券金额
    spendMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 最低消费金额
    description: { type: STRING(64), defaultValue: '' },
    sendNum: { type: INTEGER, defaultValue: 0 },
    receiveNum: { type: INTEGER, defaultValue: 0 },
    sendStartTime: { type: DATE, defaultValue: null },
    sendEndTime: { type: DATE, defaultValue: null },
    // couponSendType: { type: INTEGER, defaultValue: 1 },
    effectiveTime: { type: DATE, defaultValue: null },
    couponSendTypeName: { type: STRING(30), defaultValue: '' },
    startDate: { type: DATE, defaultValue: null },
    endDate: { type: DATE, defaultValue: null },
    status: { type: INTEGER, defaultValue: 1 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'coupons',
  });
  Coupons.associate = () => {
    Coupons.belongsToMany(app.model.Merchants, { through: 'MerchantsCoupons' });
    Coupons.belongsToMany(app.model.Orders, { through: 'OrdersCoupons' });
    Coupons.belongsToMany(app.model.Users, { through: 'UsersCoupons' });
    Coupons.belongsTo(app.model.CouponTypes, { foreignKey: 'couponSendType', constraints: false });
  };
  return Coupons;
};

'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const CouponTypes = app.model.define('couponTypes', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(32), defaultValue: '' },
  }, {
    tableName: 'coupon_types',
  });
  CouponTypes.associate = () => {
    CouponTypes.hasMany(app.model.Coupons, { foreignKey: 'couponSendType', constraints: false });
  };
  return CouponTypes;
};

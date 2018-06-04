'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const Activitys = app.model.define('activitys', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    activityNo: { type: STRING(10), defaultValue: '' },
    name: { type: STRING(30), defaultValue: '' },
    fullMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 满多少
    reduceMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 减多少
    description: { type: STRING(32), defaultValue: '' },
    startDate: { type: DATE, defaultValue: null },
    endDate: { type: DATE, defaultValue: null },
    status: { type: INTEGER, defaultValue: 1 },
    totalCount: { type: INTEGER, defaultValue: 0 },
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'activitys',
  });
  Activitys.associate = () => {
    Activitys.belongsToMany(app.model.Merchants, { through: 'MerchantsActivitys' });
    Activitys.belongsToMany(app.model.Orders, { through: 'OrdersActivitys' });
  };
  return Activitys;
};

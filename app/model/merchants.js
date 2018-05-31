'use strict';

module.exports = app => {
  const { INTEGER, STRING, FLOAT, DATE, NOW } = app.Sequelize;
  const Merchants = app.model.define('merchants', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    typeId: { type: INTEGER, defaultValue: 0 },
    name: { type: STRING(32), defaultValue: '', unique: true },
    code: { type: STRING(10), defaultValue: '' },
    address: { type: STRING(32), defaultValue: '' },
    managerName: { type: STRING(30), defaultValue: '' },
    managerPhone: { type: STRING(30), defaultValue: '' },
    description: { type: STRING(64), defaultValue: '' },
    platformCommission: { type: FLOAT(5, 2), defaultValue: 0.00 },
    tel: { type: STRING(30), defaultValue: '' },
    lat: { type: STRING(20), defaultValue: '' },
    lng: { type: STRING(20), defaultValue: '' },
    logo: { type: STRING(30), defaultValue: '' },
    notice: { type: STRING(32), defaultValue: '' },
    startDate: { type: DATE, defaultValue: NOW },
    endDate: { type: DATE, defaultValue: NOW },
    distributionInfo: { type: STRING(32), defaultValue: '' },
    startingPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
    fullFreeDistribution: { type: FLOAT(5, 2), defaultValue: 0.00 },
    distributionFee: { type: FLOAT(5, 2), defaultValue: 0.00 },
    distributionScope: { type: STRING(10), defaultValue: '' },
    deliveryTime: { type: STRING(10), defaultValue: '' },
    isOnline: { type: INTEGER, defaultValue: 1 },
    status: { type: INTEGER, defaultValue: 1 },
    accountName: { type: STRING(30), defaultValue: '' },
    accountPassword: { type: STRING(32), defaultValue: '' },
    pictures: { type: STRING(32), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'merchants',
  });
  return Merchants;
};

'use strict';
const options = {
  foreignKey: 'merchantId',
  onDelete: 'CASCADE',
  constraints: false,
};

module.exports = app => {
  const { INTEGER, STRING, FLOAT, DATE } = app.Sequelize;
  const Merchants = app.model.define('merchants', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    typeId: { type: INTEGER, defaultValue: 0 },
    name: { type: STRING(32), defaultValue: '', unique: true },
    code: { type: STRING(10), defaultValue: '' },
    address: { type: STRING(50), defaultValue: '' },
    managerName: { type: STRING(30), defaultValue: '' },
    managerPhone: { type: STRING(30), defaultValue: '' },
    description: { type: STRING(64), defaultValue: '' },
    platformCommission: { type: FLOAT(5, 2), defaultValue: 0.00 },
    tel: { type: STRING(30), defaultValue: '' },
    lat: { type: STRING(20), defaultValue: '' },
    lng: { type: STRING(20), defaultValue: '' },
    logo: { type: STRING(30), defaultValue: '' },
    notice: { type: STRING(32), defaultValue: '' },
    startDate: { type: DATE, defaultValue: null },
    endDate: { type: DATE, defaultValue: null },
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
    dayPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
    dayOrder: { type: FLOAT, defaultValue: 0 },
    monthPrice: { type: FLOAT(5, 2), defaultValue: 0 },
    monthOrder: { type: FLOAT, defaultValue: 0 },
    score: { type: INTEGER, defaultValue: 5 },
    itemCount: { type: INTEGER, defaultValue: 0 },
    itemTypeCount: { type: INTEGER, defaultValue: 0 },
    activityCount: { type: INTEGER, defaultValue: 0 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'merchants',
  });
  Merchants.associate = () => {
    Merchants.hasOne(app.model.Managers, options);
    Merchants.hasMany(app.model.Orders, options);
    Merchants.belongsToMany(app.model.Items, { through: 'MerchantsItems' });
    Merchants.hasMany(app.model.Business, options);
    Merchants.hasMany(app.model.Access, options);
    Merchants.hasMany(app.model.Sales, options);
    Merchants.hasMany(app.model.FeedBacks, options);
    Merchants.hasMany(app.model.Reports, options);
    Merchants.belongsToMany(app.model.Coupons, { through: 'MerchantsCoupons' });
    Merchants.belongsToMany(app.model.Activitys, { through: 'MerchantsActivitys' });
    Merchants.hasMany(app.model.Pictures, options);
  };
  return Merchants;
};

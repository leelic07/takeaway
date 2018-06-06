'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const MerchantTypes = app.model.define('merchantTypes', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING, defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'merchant_types',
  });
  MerchantTypes.associate = () => {
    MerchantTypes.hasMany(app.model.Merchants, { foreignKey: 'typeId', constraints: false });
  };
  return MerchantTypes;
};

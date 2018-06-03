'use strict';

module.exports = app => {
  const { INTEGER, STRING, FLOAT } = app.Sequelize;
  const Items = app.model.define('item', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(32), defaultValue: '' },
    code: { type: STRING(30), defaultValue: '' },
    label: { type: STRING(32), defaultValue: '' },
    originPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
    costPrice: { type: FLOAT(5, 2), defaultValue: 0.00 },
    price: { type: FLOAT(5, 2), defaultValue: 0.00 },
    packingCharge: { type: FLOAT(5, 2), defaultValue: 0.00 },
    unit: { type: STRING(8), defaultValue: '' },
    salesVolumn: { type: FLOAT, defaultValue: 0 },
    tips: { type: STRING(10), defaultValue: '' },
    remain: { type: FLOAT, defaultValue: 0 },
    stock: { type: FLOAT, defaultValue: 0 },
    stockStatus: { type: INTEGER, defaultValue: 0 }, // 库存状态(0:有限,1:无限)
    isPuton: { type: INTEGER, defaultValue: 1 }, // 1:在售,0:下架
    description: { type: STRING(255), defaultValue: '' },
    status: { type: INTEGER, defaultValue: '' },
    pictures: { type: STRING(125), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'item',
  });
  Items.associate = () => {
    Items.belongsToMany(app.model.Propertys, { through: 'ItemPropertys' });
    Items.belongsToMany(app.model.Merchants, { through: 'MerchantsItems' });
  };
  return Items;
};

'use strict';

module.exports = app => {
  const { INTEGER, STRING, FLOAT } = app.Sequelize;
  const Propertys = app.model.define('propertys', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(32), defaultValue: '' },
    pid: { type: INTEGER, defaultValue: null },
    price: { type: FLOAT(5, 2), defaultValue: 0.00 },
    isOpen: { type: INTEGER, defaultValue: 1 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'propertys',
  });
  Propertys.associate = () => {
    Propertys.belongsToMany(app.model.Items, { through: 'ItemsPropertys' });
  };
  return Propertys;
};

'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const ItemTypes = app.model.define('itemTypes', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: STRING(15), defaultValue: '' },
    name: { type: STRING(32), defaultValue: '' },
    quantity: { type: INTEGER, defaultValue: 0 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'item_types',
  });
  ItemTypes.associate = () => {
    ItemTypes.hasMany(app.model.Items, { foreignKey: 'itemId', onDelete: 'CASCADE', constraints: false });
  };
  return ItemTypes;
};

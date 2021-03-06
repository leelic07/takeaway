'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Pictures = app.model.define('pictures', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: STRING(125), defaultValue: '' },
  }, {
    tableName: 'pictures',
  });
  Pictures.associate = () => {
    Pictures.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
    Pictures.belongsTo(app.model.Items, { foreignKey: 'itemId', onDelete: 'CASCADE', constraints: false });
    Pictures.belongsTo(app.model.Advertisements, { foreignKey: 'advertisementId', constraints: false });
  };
  return Pictures;
};

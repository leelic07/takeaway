'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Access = app.model.define('access', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    loginfo: { type: STRING(30), defaultValue: '' },
    startTime: { type: DATE, defaultValue: '' },
    endTime: { type: DATE, defaultValue: '' },
    accessDate: { type: DATE, defaultValue: '' },
    accessTimes: { type: INTEGER, defaultValue: 0 },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'access',
  });
  Access.associate = () => {
    Access.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
  };
  return Access;
};

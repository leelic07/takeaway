'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, NOW } = app.Sequelize;
  const Managers = app.model.define('managers', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), defaultValue: '' },
    passwordHash: { type: STRING(32), defaultValue: '' },
    type: { type: INTEGER, defaultValue: 0 }, // 用户类型
    status: { type: INTEGER, defaultValue: 1 },
    lastTime: { type: DATE, defaultValue: NOW }, // 最近登录时间
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'managers',
  });
  Managers.associate = () => {
    Managers.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
  };
  return Managers;
};

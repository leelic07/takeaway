'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), defaultValue: '' },
    passwordHash: { type: STRING(32), defaultValue: '' },
    type: { type: INTEGER, defaultValue: 0 }, // 用户类型
    status: { type: INTEGER, defaultValue: 1 },
    lastTime: { type: DATE, defaultValue: '' }, // 最近登录时间
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'users',
  });
  Users.associate = () => {
    Users.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
  };
  return Users;
};

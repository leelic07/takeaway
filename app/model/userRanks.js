'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const UserRanks = app.model.define('userRanks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(30), defaultValue: '' },
    startScore: { type: INTEGER, defaultValue: 0 },
    endScore: { type: INTEGER, defaultValue: 0 },
    rebate: { type: STRING(32), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'user_ranks',
  });
  UserRanks.associate = () => {
    UserRanks.hasMany(app.model.Users, { foreignKey: 'userRankId', constraints: false });
  };
  return UserRanks;
};

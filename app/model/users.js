'use strict';
const options = {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  constraints: false,
};

module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    loginName: { type: STRING(32), defaultValue: '' },
    loginSecret: { type: STRING(30), defaultValue: '' },
    loginPwd: { type: STRING(30), defaultValue: '' },
    userSex: { type: STRING(8), defaultValue: '' },
    userType: { type: STRING(8), defaultValue: '' },
    userName: { type: STRING(32), defaultValue: '' },
    userQQ: { type: STRING(30), defaultValue: '' },
    userPhone: { type: STRING(20), defaultValue: '' },
    userEmail: { type: STRING(30), defaultValue: '' },
    userScore: { type: INTEGER, defaultValue: 0 },
    userPhoto: { type: STRING(30), defaultValue: '' },
    userTotalScore: { type: INTEGER, defaultValue: 0 },
    status: { type: INTEGER, defaultValue: 0 },
    isFlag: { type: INTEGER, defaultValue: 0 },
    lastIP: { type: STRING(8), defaultValue: '' },
    lastTime: { type: DATE, defaultValue: null },
    userFrom: { type: STRING(50), defaultValue: '' },
    lockMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    distributionMoney: { type: FLOAT(5, 2), defaultValue: 0.00 },
    isBuyer: { type: INTEGER, defaultValue: 0 },
    payPwd: { type: STRING(32), defaultValue: '' },
    orderCount: { type: INTEGER, defaultValue: 0 },
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0 },
    // userRank: { type: STRING(15), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'users',
  });
  Users.associate = () => {
    Users.hasMany(app.model.Feedbacks, options);
    Users.hasMany(app.model.Orders, options);
    Users.belongsToMany(app.model.Coupons, { through: 'UsersCoupons' });
    Users.belongsTo(app.model.UserRanks, { foreignKey: 'userRankId', constraints: false });
  };
  return Users;
};

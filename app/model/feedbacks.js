'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Feedbacks = app.model.define('feedbacks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pid: { type: INTEGER, defaultValue: '' },
    evaluate: { type: INTEGER, defaultValue: 3 }, // 好评:3,中评:2,差评:1
    goodsScore: { type: INTEGER, defaultValue: 5 },
    foodScore: { type: INTEGER, defaultValue: 5 },
    distributionScore: { type: INTEGER, defaultValue: 5 }, // 配送评价
    content: { type: STRING(255), defaultValue: '' },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'feedbacks',
  });
  Feedbacks.associate = () => {
    Feedbacks.belongsTo(app.model.Merchants, { foreignKey: 'merchantId', onDelete: 'CASCADE', constraints: false });
    Feedbacks.belongsTo(app.model.Orders, { foreignKey: 'orderId', onDelete: 'CASCADE', constraints: false });
    Feedbacks.belongsTo(app.model.Members, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });
  };
  return Feedbacks;
};

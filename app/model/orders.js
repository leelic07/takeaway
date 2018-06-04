'use strict';

module.exports = app => {
  const { INTEGER, STRING, FLOAT, DATE } = app.Sequelize;
  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    orderNo: { type: STRING(32), defaultValue: '', allowNull: false, unique: true },
    meals: { tyep: INTEGER, defaultValue: '1' },
    totalPrice: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 总价格
    packingCharge: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 打包费
    deliverMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 配送费
    status: { type: INTEGER, defaultValue: 1 }, // 订单状态(1:待支付,2:待发货,3:待收货,4:待评价,5:已完成,6:退款/售后,7:已退款,8:超时未支付作废)
    isPay: { type: INTEGER, default: 0 }, // 是否支付(1:是,0:否)
    payDate: { type: DATE, defaultValue: null },
    paysNo: { type: STRING(30), defaultValue: '' },
    realToMoney: { type: FLOAT(5, 2), defaultValue: 0.00 }, // 实际支付价格
    isShip: { type: INTEGER, defaultValue: 0 },
    shipDate: { type: DATE, defaultValue: null },
    isReceipt: { type: INTEGER, defaultValue: 0 },
    receiptDate: { type: DATE, defaultValue: null },
    refundApplyDate: { type: DATE, defaultValue: null },
    isRefund: { type: INTEGER, defaultValue: 0 }, // 是否退款(1:已退款,0:未退款)
    refundDate: { type: DATE, defaultValue: null },
    refundMoney: { tyep: FLOAT(5, 2), defaultValue: 0.00 },
    isReservation: { type: INTEGER, defaultValue: 0 }, // 是否预定
    reservationDate: { type: DATE, defaultValue: null }, // 预定时间
    reservationTime: { type: DATE, defaultValue: null },
    isReminder: { type: INTEGER, defaultValue: 0 },
    reminderDate: { type: DATE, defaultValue: null },
    isDistribution: { type: INTEGER, defaultValue: 0 }, // 是否配送
    distributionDate: { type: DATE, defaultValue: null }, // 配送时间
    remark: { type: STRING(64), defaultValue: '' }, // 备注
    payType: { type: STRING(10), defaultValue: '' },
    isAppraises: { type: INTEGER, defaultValue: 0 }, // 是否评价
    appraisesDate: { type: DATE, defaultValue: null },
    orderScore: { type: INTEGER, defaultValue: 5 },
    startTime: { type: DATE, defaultValue: null },
    endTime: { type: DATE, defaultValue: null },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'orders',
  });
  Orders.associate = () => {
    Orders.belongsToMany(app.model.Coupons, { through: 'OrdersCoupons' });
    Orders.belongsToMany(app.model.Activitys, { through: 'OrdersActivitys' });
    Orders.belongsToMany(app.model.Items, { through: 'OrdersItems' });
    Orders.hasMany(app.model.Feedbacks, { foreignKey: 'orderId', onDelete: 'CASCADE', constraints: false });
    Orders.belongsTo(app.model.Users, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });
  };
  return Orders;
};

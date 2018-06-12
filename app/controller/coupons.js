'use strict';
const Controller = require('egg').Controller;

class CouponsController extends Controller {
  async page() {
    const { ctx, service } = this;
    const result = await service.coupons.page(ctx.query);
    result ? ctx.success(result, '查询优惠券成功') : ctx.fail('查询优惠券失败');
  }
}

module.exports = CouponsController;

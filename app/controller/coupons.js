'use strict';
const Controller = require('egg').Controller;

class CouponsController extends Controller {
  async page() {
    const { ctx, service } = this;
    const result = await service.coupons.page(ctx.query);
    result ? ctx.success(result, '查询优惠券成功') : ctx.fail('查询优惠券失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.coupons.save(ctx.request.body);
    result ? ctx.success(result, '新增优惠券成功') : ctx.fail('新增优惠券失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.coupons.edit(ctx.query);
    result ? ctx.success({ coupons: result }, '查询优惠券成功') : ctx.fail('查询优惠券失败');
  }
}

module.exports = CouponsController;

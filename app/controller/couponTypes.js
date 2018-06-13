'use strict';
const Controller = require('egg').Controller;

class CouponTypesController extends Controller {
  async bulkSave() {
    const { ctx, service } = this;
    const result = await service.couponTypes.bulkSave(ctx.request.body);
    result ? ctx.success({ couponSendTypes: result }, '新增优惠券类型成功') : ctx.fail('新增优惠券类型失败');
  }

  async list() {
    const { ctx, service } = this;
    const result = await service.couponTypes.list();
    result ? ctx.success({ couponSendTypes: result }, '查询优惠券类型成功') : ctx.fail('查询优惠券类型失败');
  }
}

module.exports = CouponTypesController;

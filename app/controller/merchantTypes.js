'use strict';
const Controller = require('egg').Controller;

class MerchantTypesController extends Controller {
  async list() {
    const { ctx, service } = this;
    const merchantTypes = await service.merchantTypes.list();
    merchantTypes ? ctx.success({ merchantTypes }, '查询商户类型成功') : ctx.fail('查询商户类型失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.save(ctx.request.body);
    result ? ctx.success(result, '新增商户类型成功') : ctx.fail('新增商户类型失败');
  }
}

module.exports = MerchantTypesController;

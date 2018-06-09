'use strict';
const Controller = require('egg').Controller;

class MerchantTypesController extends Controller {
  async list() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.list();
    result ? ctx.success({ merchantTypes: result }, '查询类别成功') : ctx.fail('查询类别失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.save(ctx.request.body);
    result ? ctx.success(result, '新增类别成功') : ctx.fail('新增类别失败');
  }
}

module.exports = MerchantTypesController;

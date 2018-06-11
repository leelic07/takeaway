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

  async page() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.page(ctx.query);
    result ? ctx.success(result, '查询类别成功') : ctx.fail('查询类别失败');
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.update(ctx.request.body);
    result ? ctx.success(result, '更新类别成功') : ctx.fail('更新类别失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.merchantTypes.edit(ctx.query);
    result ? ctx.success({ merchantTypes: result }, '查询类别成功') : ctx.fail('查询类别失败');
  }
}

module.exports = MerchantTypesController;

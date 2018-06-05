'use strict';
const Controller = require('egg').Controller;

class MerchantsController extends Controller {
  async save() {
    const { ctx, service } = this;
    const result = await service.merchants.save(ctx.request.body);
    result ? ctx.success(result, '新增商户成功') : ctx.fail('新增商户失败');
  }

  async page() {
    const { ctx, service } = this;
    const merchants = await service.merchants.page(ctx.query);
    merchants ? ctx.success(merchants, '查询商户成功') : ctx.fail('查询商户失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.merchants.edit(ctx.query.id);
    result ? ctx.success(result, '查询商户成功') : ctx.fail('查询商户失败');
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.merchants.update(ctx.request.body);
    result ? ctx.success(result, '更新商户成功') : ctx.fail('更新商户失败');
  }
}

module.exports = MerchantsController;

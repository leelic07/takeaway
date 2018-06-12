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
    const result = await service.merchants.page(ctx.query);
    result ? ctx.success(result, '查询商户成功') : ctx.fail('查询商户失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.merchants.edit(ctx.query.id);
    result ? ctx.success({ merchants: result }, '查询商户成功') : ctx.fail('查询商户失败');
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.merchants.update(ctx.request.body);
    result ? ctx.success(result, '更新商户成功') : ctx.fail('更新商户失败');
  }

  async list() {
    const { ctx, service } = this;
    const result = await service.merchants.list();
    result ? ctx.success({ merchants: result }, '查询商户成功') : ctx.fail('查询商户失败');
  }

  async homePage() {
    const { ctx, service } = this;
    const result = await service.merchants.homePage(ctx.query);
    ctx.success({ merchants: result }, '查询商户成功');
  }

  async bindItemlist() {
    const { ctx, service } = this;
    const result = await service.merchants.bindItemlist(ctx.query);
    result ? ctx.success({ merchants: result }, '查询商户成功') : ctx.fail('查询商户失败');
  }
}

module.exports = MerchantsController;

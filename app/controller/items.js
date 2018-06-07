'use strict';
const Controller = require('egg').Controller;

class ItemsController extends Controller {
  async page() {
    const { ctx, service } = this;
    const items = await service.items.page(ctx.query);
    items ? ctx.success({ items }, '查询商品成功') : ctx.fail('查询商品失败');
  }

  async save() {
    const { ctx, service } = this;
    const items = await service.items.save(ctx.request.body);
    items ? ctx.success({ items }, '新增商品成功') : ctx.fail('新增商品失败');
  }
}

module.exports = ItemsController;

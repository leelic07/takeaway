'use strict';
const Controller = require('egg').Controller;

class ItemTypesController extends Controller {
  async list() {
    const { ctx, service } = this;
    const itemTypes = await service.itemTypes.list();
    itemTypes ? ctx.success({ itemTypes }, '查询商品类别成功') : ctx.fail('查询商品类别失败');
  }

  async save() {
    const { ctx, service } = this;
    const itemTypes = await service.itemTypes.save(ctx.request.body);
    itemTypes ? ctx.success(itemTypes, '新增商品类别成功') : ctx.fail('新增商品类别失败');
  }

  async page() {
    const { ctx, service } = this;
    const itemTypes = await service.itemTypes.page(ctx.query);
    itemTypes ? ctx.success({ itemTypes }, '查询商品类别成功') : ctx.fail('查询商品类别失败');
  }
}

module.exports = ItemTypesController;

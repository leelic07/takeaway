'use strict';
const Controller = require('egg').Controller;

class ItemTypesController extends Controller {
  async list() {
    const { ctx, service } = this;
    const result = await service.itemTypes.list();
    result ? ctx.success({ itemTypes: result }, '查询类别成功') : ctx.fail('查询类别失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.itemTypes.save(ctx.request.body);
    result ? ctx.success(result, '新增类别成功') : ctx.fail('新增类别失败');
  }

  async page() {
    const { ctx, service } = this;
    const result = await service.itemTypes.page(ctx.query);
    result ? ctx.success(result, '查询类别成功') : ctx.fail('查询类别失败');
  }
}

module.exports = ItemTypesController;

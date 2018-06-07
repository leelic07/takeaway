'use strict';
const Controller = require('egg').Controller;

class ItemTypesController extends Controller {
  async list() {
    const { ctx, service } = this;
    const itemTypes = await service.itemTypes.list();
    itemTypes ? ctx.success({ itemTypes }, '查询商品类别成功') : ctx.fail('查询商品类别失败');
  }
}

module.exports = ItemTypesController;

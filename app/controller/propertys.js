'use strict';
const Controller = require('egg').Controller;

class PropertysController extends Controller {
  async parent() {
    const { ctx, service } = this;
    const propertys = await service.propertys.parent();
    propertys ? ctx.success({ propertys, size: propertys.length }, '查询商品属性成功') : ctx.fail('查询商品属性失败');
  }
}

module.exports = PropertysController;

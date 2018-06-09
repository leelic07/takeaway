'use strict';
const Controller = require('egg').Controller;

class PropertysController extends Controller {
  async parent() {
    const { ctx, service } = this;
    const propertys = await service.propertys.parent();
    propertys ? ctx.success({ propertys, size: propertys.length }, '查询属性成功') : ctx.fail('查询属性失败');
  }

  async bathcSave() {
    const { ctx, service } = this;
    const propertys = await service.propertys.bathcSave(ctx.request.body);
    propertys ? ctx.success(propertys, '新增属性成功') : ctx.fail('新增属性失败');
  }
}

module.exports = PropertysController;

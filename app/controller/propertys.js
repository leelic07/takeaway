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

  async page() {
    const { ctx, service } = this;
    const result = await service.propertys.page(ctx.query);
    result ? ctx.success(result, '查询属性成功') : ctx.fail('查询属性失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.propertys.edit(ctx.query);
    result ? ctx.success({ propertys: result }, '查询属性成功') : ctx.fail('查询属性失败');
  }

  async bathcUpdate() {
    const { ctx, service } = this;
    const result = await service.propertys.bathcUpdate(ctx.request.body);
    result ? ctx.success(result, '更新属性成功') : ctx.fail('更新属性失败');
  }

  async delete() {
    const { ctx, service } = this;
    const result = await service.propertys.delete(ctx.request.body);
    result ? ctx.success(result, '删除属性成功') : ctx.fail('删除属性失败');
  }

  async children() {
    const { ctx, service } = this;
    const result = await service.propertys.children(ctx.query);
    if (result) {
      result.forEach(prop => {
        prop.isOpen = !!prop.isOpen;
      });
      ctx.success({ propertys: result }, '查询属性成功');
    } else ctx.fail('查询属性失败');
  }
}

module.exports = PropertysController;

'use strict';
const Controller = require('egg').Controller;

class ActivitysController extends Controller {
  async page() {
    const { ctx, service } = this;
    const result = await service.activitys.page(ctx.query);
    result ? ctx.success(result, '查询活动成功') : ctx.fail('查询活动失败');
  }

  async save() {
    const { ctx, service } = this;
    const result = await service.activitys.save(ctx.request.body);
    result ? ctx.success({ activitys: result }, '新增活动成功') : ctx.fail('新增活动失败');
  }

  async edit() {
    const { ctx, service } = this;
    const result = await service.activitys.edit(ctx.query);
    if (result) {
      ctx.success({ activitys: result }, '查询活动成功');
    } else ctx.fail('查询活动失败');
  }

  async update() {
    const { ctx, service } = this;
    const result = await service.activitys.update(ctx.request.body);
    result ? ctx.success(result, '更新活动成功') : ctx.fail('更新活动失败');
  }
}

module.exports = ActivitysController;

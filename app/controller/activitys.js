'use strict';
const Controller = require('egg').Controller;

class ActivitysController extends Controller {
  async page() {
    const { ctx, service } = this;
    const result = await service.activitys.page(ctx.query);
    result ? ctx.success(result, '查询活动成功') : ctx.fail('查询活动失败');
  }
}

module.exports = ActivitysController;

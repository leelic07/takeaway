'use strict';
const Controller = require('egg').Controller;

class UserRanksController extends Controller {
  async list() {
    const { ctx, service } = this;
    const result = await service.userRanks.list();
    result ? ctx.success({ userRanks: result }, '查询会员等级成功') : ctx.fail('查询会员等级失败');
  }

  async batchSave() {
    const { ctx, service } = this;
    const result = await service.userRanks.batchSave(ctx.request.body);
    result ? ctx.success(result, '新增会员等级成功') : ctx.fail('新增会员等级失败');
  }

  async batchUpdate() {
    const { ctx, service } = this;
    const result = await service.userRanks.batchUpdate(ctx.request.body);
    result ? ctx.success(result, '更新会员成功') : ctx.fail('更新会员失败');
  }
}

module.exports = UserRanksController;

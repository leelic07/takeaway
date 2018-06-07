'use strict';
const Controller = require('egg').Controller;

class ManagersController extends Controller {
  async login() {
    const { ctx, service } = this;
    const manager = await service.managers.login(ctx.request.body);
    if (manager) {
      ctx.session = {
        managerId: manager.id,
      };
      ctx.success({ users: manager }, '登录成功');
    } else ctx.fail('用户名或密码错误');
  }

  async register() {
    const { ctx, service } = this;
    const result = await service.managers.register(ctx.request.body);
    result ? ctx.success(result, '注册用户成功') : ctx.fail('注册用户失败');
  }

  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.session ? ctx.fail('退出登录失败') : ctx.success({}, '退出登录成功');
  }
}

module.exports = ManagersController;

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
    } else ctx.fail('用户名或密码不正确');
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

  async edit() {
    const { ctx, service } = this;
    const result = await service.managers.edit(ctx.query);
    result ? ctx.success({ managers: result }, '查询用户成功') : ctx.fail('查询用户失败');
  }

  async resetPwd() {
    const { ctx, service } = this;
    const result = await service.managers.resetPwd(ctx.request.body);
    result ? ctx.success(result, '修改用户密码成功') : ctx.fail('修改用户密码失败');
  }
}

module.exports = ManagersController;

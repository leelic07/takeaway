'use strict';
const Controller = require('egg').Controller;

class ManagersController extends Controller {
  async login() {
    const { ctx, service } = this;
    const manager = await service.managers.login();
    manager ? ctx.success({ users: manager }, '登录成功') : ctx.fail('用户名或密码错误');
  }
}

module.exports = ManagersController;

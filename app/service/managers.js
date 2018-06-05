'use strict';
const Service = require('egg').Service;

class ManagersService extends Service {
  async login(manager) {
    const { ctx } = this;
    manager.passwordHash = ctx.helper.md5(manager.passwordHash);
    const result = await ctx.model.Managers.findOne({
      where: manager,
    });
    return result;
  }

  async register(manager) {
    const { ctx } = this;
    manager.passwordHash = ctx.helper.md5(manager.passwordHash);
    const result = await ctx.model.Managers.create(manager);
    return result;
  }
}

module.exports = ManagersService;

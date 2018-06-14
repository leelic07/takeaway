'use strict';
const Base = require('./base');

class ManagersService extends Base {
  async login(manager) {
    const { ctx } = this;
    manager.passwordHash = ctx.helper.md5(manager.passwordHash);
    const result = await ctx.model.Managers.findOne({
      where: manager,
    });
    result && await ctx.model.Managers.update({ lastTime: new Date() }, {
      where: { id: result.id },
    });
    return result;
  }

  async register(manager) {
    const { ctx } = this;
    manager.passwordHash = ctx.helper.md5(manager.passwordHash);
    const result = await ctx.model.Managers.create(manager);
    return result;
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.Managers.findById(param.id, {
      attributes: [ 'name', 'type', 'lastTime' ],
      include: [{
        model: ctx.model.Merchants,
      }],
    });
    result.dataValues.merchants = result.merchant;
    delete result.dataValues.merchant;
    return result;
  }

  async resetPwd(data) {
    const { ctx } = this;
    const id = ctx.session.managerId;
    const newPassword = ctx.helper.md5(data.new_password);
    const oldPassword = ctx.helper.md5(data.old_password);
    const result = await ctx.model.Managers.update({ passwordHash: newPassword }, {
      where: {
        id,
        passwordHash: oldPassword,
      },
    });
    result && (ctx.session = null);
    return result;
  }
}

module.exports = ManagersService;

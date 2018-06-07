'use strict';
const Service = require('egg').Service;

class PropertysService extends Service {
  async parent() {
    const { ctx, transaction } = this;
    const propertys = await ctx.model.Propertys.findAll({
      where: { pid: null },
      transaction,
    });
    return propertys;
  }
}

module.exports = PropertysService;

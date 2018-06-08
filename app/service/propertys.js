'use strict';
const Base = require('./base');

class PropertysService extends Base {
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

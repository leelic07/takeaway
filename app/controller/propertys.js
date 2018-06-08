'use strict';
const Controller = require('egg').Controller;

class PropertysController extends Controller {
  async parent() {
    const { service } = this;
    const propertys = await service.propertys.parent();
    return propertys && { propertys, size: propertys.length };
  }

  async bathcSave() {
    const { ctx, service } = this;
    const propertys = await service.propertys.bathcSave();
    propertys ? ctx.success() : ctx.fail();
  }
}

module.exports = PropertysController;

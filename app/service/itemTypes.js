'use strict';
const Service = require('egg').Service;

class ItemTypesService extends Service {
  async list() {
    const { ctx } = this;
    const itemTypes = await ctx.model.ItemTypes.findAll();
    return itemTypes;
  }
}

module.exports = ItemTypesService;

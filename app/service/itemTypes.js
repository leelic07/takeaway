'use strict';
const Base = require('./base');

class ItemTypesService extends Base {
  async list() {
    const { ctx } = this;
    const itemTypes = await ctx.model.ItemTypes.findAll();
    return itemTypes;
  }

  async save(param) {
    const { ctx } = this;
    const itemTypes = await ctx.model.ItemTypes.create(param);
    return itemTypes;
  }

  async page(param) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(param);
    const itemTypes = await ctx.model.ItemTypes.findAll({
      where,
      limit,
      offset,
    });
    return itemTypes;
  }
}

module.exports = ItemTypesService;

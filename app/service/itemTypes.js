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
    const totalCount = await ctx.model.ItemTypes.count({
      where,
    });
    return {
      itemTypes,
      totalCount,
    };
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.ItemTypes.findById(param.id);
    return result;
  }

  async update(data) {
    const { ctx } = this;
    const result = await ctx.model.ItemTypes.update(data, {
      where: { id: data.id },
    });
    return result;
  }
}

module.exports = ItemTypesService;

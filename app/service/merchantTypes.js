'use strict';
const Base = require('./base');

class MerchantTypesService extends Base {
  async list() {
    const { ctx } = this;
    const merchantTypes = await ctx.model.MerchantTypes.findAll();
    return merchantTypes;
  }

  async save(merchantTypes) {
    const { ctx } = this;
    const result = await ctx.model.MerchantTypes.create(merchantTypes);
    return result;
  }

  async page(pagination) {
    const { ctx } = this;
    const { limit, offset, where } = ctx.helper.page(pagination);
    const merchantTypes = await ctx.model.MerchantTypes.findAll({
      where,
      limit,
      offset,
    });
    const totalCount = await ctx.model.MerchantTypes.count({
      where,
    });
    return {
      merchantTypes,
      totalCount,
    };
  }

  async update(data) {
    const { ctx } = this;
    const result = await ctx.model.MerchantTypes.update(data, {
      where: { id: data.id },
    });
    return result;
  }

  async edit(param) {
    const { ctx } = this;
    const result = await ctx.model.MerchantTypes.findById(param.id);
    return result;
  }
}

module.exports = MerchantTypesService;

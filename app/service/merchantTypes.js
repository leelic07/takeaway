'use strict';
const Service = require('egg').Service;

class MerchantTypesService extends Service {
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
}

module.exports = MerchantTypesService;

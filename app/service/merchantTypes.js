'use strict';
const Base = require('./base');

class MerchantTypesService extends Base {
  async list() {
    const { ctx } = this;
    const merchantTypes = await ctx.model.MerchantTypes.findAll();
    return merchantTypes;
  }

  async save(merchantTypes) {
    const { ctx, transaction } = this;
    const result = await ctx.model.MerchantTypes.create(merchantTypes, {
      transaction,
    });
    return result;
  }
}

module.exports = MerchantTypesService;
